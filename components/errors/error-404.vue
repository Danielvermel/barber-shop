<template>
    <main>
        <div class="sw">
            <h1 class="massive">404</h1>

            <h2>we can’t seem to find the page you were looking for ...</h2>

            <p>Some helpful links</p>
        </div>
    </main>
</template>




<script>
    export default {
        name: 'Error404',
        props: {
            componentName: {
                default: 'error-page',
                type: String
            },
            error: {
                required: true
            }
        },
    }
</script>


<style lang="scss">
    @use "./errors.scss";
</style>
