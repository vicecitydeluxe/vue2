export default {
    methods: {
        multiSelectHandler() {
            setTimeout(() => {
                document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
                document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
                document.querySelectorAll('.p-multiselect-item').forEach(e => e.classList.add('p-multiselect-item_dark'))
                document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
                document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
                document.querySelectorAll('.p-multiselect-empty-message').forEach(e => e.classList.add('p-multiselect-empty-message_dark'))
                document.querySelectorAll('.p-multiselect-header').forEach(e => e.classList.add('p-multiselect-header_dark'))
                document.querySelectorAll('.p-multiselect-filter-icon').forEach(e => e.classList.add('p-multiselect-filter-icon_dark'))
            }, 0)
        },
        switchHandler() {
            document.querySelectorAll('.p-inputnumber-input').forEach(e => e.classList.add('p-inputnumber-input_dark'))
            document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
            document.querySelectorAll('.sticky').forEach(e => e.classList.add('sticky_dark'))
            document.querySelectorAll('.sticky_number__title').forEach(e => e.classList.add('sticky_number__title_dark'))
            document.querySelectorAll('.filter_header').forEach(e => e.classList.add('filter_header_dark'))
            document.querySelectorAll('.filter_header_divider').forEach(e => e.classList.add('filter_header_divider_dark'))
            document.querySelectorAll('.filter_container').forEach(e => e.classList.add('filter_container_dark'))
            document.querySelectorAll('.filter_container_wrapper').forEach(e => e.classList.add('filter_container_wrapper_dark'))
            document.querySelectorAll('.limit_header').forEach(e => e.classList.add('limit_header_dark'))
            document.querySelectorAll('.limit_container').forEach(e => e.classList.add('limit_container_dark'))
            document.querySelectorAll('.p-radiobutton-box').forEach(e => e.classList.add('p-radiobutton-box_dark'))
            document.querySelectorAll('.options_container_button').forEach(e => e.classList.add('options_container_button_dark'))
        },
        switchRemover() {
            const darkStylesSelectors = ['p-inputnumber-input', 'p-placeholder_dark', 'sticky_dark',
                'sticky_number__title_dark', 'filter_header_dark', 'filter_header_divider_dark',
                'filter_container_dark', 'filter_container_wrapper_dark',
                'limit_header_dark', 'limit_container_dark',
                'p-radiobutton-box_dark', 'options_container_button'
            ]
            document.querySelectorAll('[class*="_dark"]')
                .forEach(e => e.classList.remove(...darkStylesSelectors))
        },
    },
}

