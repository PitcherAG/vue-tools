import Handlebars from 'handlebars';
import Config from '../store/config';

function contextQuery(query, context, db) {
    let template = Handlebars.compile(query);
    let d = Config.getters.tableDict(Config.state);
    for (let a in context) {
        if (context.hasOwnProperty(a)) {
            d[a] = context[a];
        }
    }
    let q = template(d);
    return query(q, db);
}

export {
    contextQuery
};
