export default {
    methods: {
        dropdownHandler() {
            setTimeout(() => {
                document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
                document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
                document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
                document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
                document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
                document.querySelectorAll('.p-dropdown-empty-message').forEach(e => e.classList.add('p-dropdown-empty-message_dark'))
                document.querySelectorAll('.p-dropdown-header').forEach(e => e.classList.add('p-dropdown-header_dark'))
                document.querySelectorAll('.p-dropdown-filter-icon').forEach(e => e.classList.add('p-dropdown-filter-icon_dark'))
            }, 0)
        },
        dataHandler() {
            setTimeout(() => {
                document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
                document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
                document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
                document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
                document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
            }, 0)
        },
        switchHandler() {
            document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
            document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
            document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
            document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
            document.querySelectorAll('.description').forEach(e => e.classList.add('description_dark'))
            document.querySelectorAll('.p-dropdown-empty-message').forEach(e => e.classList.add('p-dropdown-empty-message_dark'))
            document.querySelectorAll('.p-dropdown-header').forEach(e => e.classList.add('p-dropdown-header_dark'))
            document.querySelectorAll('.p-dropdown-filter-icon').forEach(e => e.classList.add('p-dropdown-filter-icon_dark'))
        },
        switchRemover() {
            const darkStylesSelectors = ['p-placeholder_dark', 'pi-chevron-down_dark',
                'p-dropdown-item_dark', 'p-inputtext_dark',
                'p-highlight_dark', 'description_dark',
                'p-dropdown-empty-message_dark', 'p-dropdown-header_dark',
                'p-dropdown-filter-icon_dark']
            document.querySelectorAll('[class*="_dark"]')
                .forEach(e => e.classList.remove(...darkStylesSelectors))
        },
    },
}

