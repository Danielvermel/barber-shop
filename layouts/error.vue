<template>
    <component
        :is="errorPage"
        :error="error"
    />
</template>



<script>
    import Error404 from "@/components/errors/error-404";
    import Error500 from "@/components/errors/error-500";
    

    export default {
        name: 'nuxt-error',
        layout: 'default',
        components: {
            'error-404': Error404,
            'error-500': Error500
        },
        props: {
            error: {
                type: Object,
                default: () => {}
            },
        },
        computed: {
            errorPage() {
                if (this.error.statusCode === 404) {
                    return 'error-404';
                }
                // catch everything else
                return 'error-500';
            },
        }
    }
</script>