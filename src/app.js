import { fireEvent } from './event'
import { getFilesWithKeyword } from './files'
import { PLATFORM } from './platform'

export function closeModal() {
    fireEvent('closeOpenModal')
}

export function resyncData() {
    fireEvent('resyncData')
}

export function planCall() {
    fireEvent('planCall')
}

export function startCall() {
    fireEvent('startCall')
}

export function startPrecall() {
    fireEvent('startPrecall')
}

export function searchPitcherFile(q) {
    return fireEvent('searchPitcherFile', {
        extra: q,
        body: q,
        keywords: q,
        rangeCheck: true
    })
}

export function loadWebPageFromFolder(
    fileURL,
    title,
    fileID,
    parameter,
    showBar = false,
    folderName = 'zip',
    allowPortrait = false
) {
    fireEvent('loadWebPageFromFolder', {
        urlValue: fileURL,
        title: title,
        showBar: showBar,
        ID: fileID,
        folderName: folderName,
        allowPortrait: allowPortrait,
        parameters: parameter
    })
}

export async function launchFileWithKeyword(keyword, params) {
    const files = await getFilesWithKeyword(keyword)
    if (files.length !== 1) {
        alert(files.length + ' files found for keyword: ' + keyword)
    }
    const file = files[0]
    const fileUrl =
        file.vUrl.replace('.zip', '').replace('zip/', '') + '/index.html'
    if (PLATFORM === 'ANDROID') {
        loadWebPageFromFolder(fileUrl, file.body, file.ID, params)
    } else {
        launchContentWithID(file.ID, params)
    }
}

export function launchFileWithID(id) {
    fireEvent('launchFileWithID', {
        fileID: id
    })
}

export function launchContentWithID(
    id,
    params,
    subId = 0,
    currentID,
    forceChange = false
) {
    fireEvent('launchContentWithID', {
        fileID: id,
        parameters: params,
        subId,
        currentID,
        forceChange
    })
}

export function saveObject(obj) {
    const ignores = [
        'CurrencyIsoCode',
        'attributes',
        'CreatedById',
        'CreatedDate',
        'IsDeleted',
        'LastActivityDate',
        'LastModifiedById',
        'LastModifiedDate',
        'SystemModstamp'
    ]
    if (!obj.ignoreFields) {
        obj.ignoreFields = []
    }
    for (const a in obj) {
        if (
            (obj[a] && obj[a].attributes) ||
            a.indexOf('111') > -1 ||
            a.endsWith('__r')
        ) {
            if (obj.ignoreFields.indexOf(a) === -1) {
                obj.ignoreFields.push(a)
            }
        }
        if (obj[a] === null || typeof obj[a] == 'undefined') {
            // no value... add it to the fieldsToNull
            if (!obj.fieldsToNull) {
                obj.fieldsToNull = []
            }
            if (obj.fieldsToNull.indexOf(a) === -1) {
                obj.fieldsToNull.push(a)
            }
        } else {
            // we have a value ... if it is in fieldsToNull... remove it
            if (obj.fieldsToNull && obj.fieldsToNull.indexOf(a) > -1) {
                obj.fieldsToNull.splice(obj.fieldsToNull.indexOf(a), 1)
            }
        }
    }
    for (const i of ignores) {
        if (obj.ignoreFields.indexOf(i) === -1) {
            obj.ignoreFields.push(i)
        }
    }
    if (!obj.objectType) {
        throw new Error('no objectType defined')
    }
    console.log('save object', obj)
    if (obj.Id) {
        fireEvent('sendStatsFromHTML', {
            event_name: 'event_redirect_updateSFDC',
            event_params: obj
        })
    } else {
        fireEvent('sendStatsFromHTML', {
            event_name: 'event_redirect_createSFDC',
            event_params: obj
        })
    }
}

export function getSchema(objectName) {
    const desc = objectName + '_desc'
    return fireEvent('getFromHTML', { id: desc, useSFDCDB: true })
}

export function getLayout(objectName, objectTypeId) {
    const desc = objectName + '_' + objectTypeId + '_layout'
    console.log(desc)
    return fireEvent('getFromHTML', { id: desc, useSFDCDB: true })
}
