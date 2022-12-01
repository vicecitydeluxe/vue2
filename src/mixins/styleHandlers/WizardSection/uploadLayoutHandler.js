export default {
    methods: {
        dropdownHandler() {
            setTimeout(() => {
                document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
                document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
                document.querySelectorAll('.p-dropdown-item').forEach(e => e.classList.add('p-dropdown-item_dark'))
                document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext_dark'))
                document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
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
            document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
            document.querySelectorAll('.p-fluid').forEach(e => e.classList.add('p-fluid-dark'))
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-inputwrapper-focus').forEach(e => e.classList.add('p-inputwrapper-focus-dark'))
            document.querySelectorAll('.p-inputwrapper-filled').forEach(e => e.classList.add('p-inputwrapper-filled-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.btn_left').forEach(e => e.classList.add('btn_left_dark'))
            document.querySelectorAll('.btn_middle').forEach(e => e.classList.add('btn_middle_dark'))
            document.querySelectorAll('.btn_right').forEach(e => e.classList.add('btn_right_dark'))
        },
        switchRemover() {
            const darkStylesSelectors = ['p-placeholder_dark', 'pi-chevron-down_dark',
                'p-dropdown-item_dark', 'p-highlight_dark', 'p-inputtext_dark',
                'btn_left_dark', 'btn_middle_dark', 'btn_right_dark']
            const darkStyles = ['p-fluid-dark', 'p-inputtext-dark',
                'p-filled-dark', 'p-inputwrapper-focus-dark',
                'p-inputwrapper-filled-dark', 'p-component-dark'
            ]
            document.querySelectorAll('[class*="_dark"]')
                .forEach(e => e.classList.remove(...darkStylesSelectors))
            document.querySelectorAll('[class*="-dark"]')
                .forEach(e => e.classList.remove(...darkStyles))
        },
        listHandler() {
            setTimeout(() => {
                document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
                document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
                document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
                document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
            }, 0)
        }
    },
}

