<template>
    <main >
        <div class="sw">
            <h1 class="massive">500</h1>

            <h2>we can’t seem to find the page you were looking for ...</h2>

            <p>Some helpful links</p>

            <div class="error-ctas">
                <nuxt-link
                    v-for="link in error_links"
                    class="button outline wide"
                    :to="link.url"
                    :title="'View ' + link.title"
                    :key="link.title"
                >
                    {{ link.title }}
                </nuxt-link>
            </div>
        </div>
    </main>
</template>




<script>
    export default {
        name: 'Error500',
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
