export default {
    methods: {
        switchHandler() {
            setTimeout(() => {
                document.querySelectorAll('.p-accordion-header-link').forEach(e => e.classList.add('p-accordion-header-link_dark'))
                document.querySelectorAll('.p-accordion-content').forEach(e => e.classList.add('p-accordion-content_dark'))
                document.querySelectorAll('.options_container_button').forEach(e => e.classList.add('options_container_button_dark'))
                document.querySelectorAll('.description').forEach(e => e.classList.replace('description', 'description_dark'))
            }, 0)
        },
        switchRemover() {
            document.querySelectorAll('.p-accordion-header-link_dark').forEach(e => e.classList.remove('p-accordion-header-link_dark'))
            document.querySelectorAll('.p-accordion-content_dark').forEach(e => e.classList.remove('p-accordion-content_dark'))
            document.querySelectorAll('.options_container_button').forEach(e => e.classList.remove('options_container_button_dark'))
            document.querySelectorAll('.description_dark').forEach(e => e.classList.replace('description_dark', 'description'))
        },
    },
}