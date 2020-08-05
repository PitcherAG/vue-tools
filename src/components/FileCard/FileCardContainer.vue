<template>
    <div class="file-card-container">
        <slot />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.file-card-container {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    align-content: flex-start;
    margin-right: -16px;
}
</style>
