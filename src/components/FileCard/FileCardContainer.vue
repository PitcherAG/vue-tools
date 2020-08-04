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
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: space-between;
    width: 100%;
}
</style>
