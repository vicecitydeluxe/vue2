export default {
    methods: {
        multiSelectHandler() {
            setTimeout(() => {
                document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
                document.querySelectorAll('.pi-chevron-down').forEach(e => e.classList.add('pi-chevron-down_dark'))
                document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputnumber-input_dark'))
                document.querySelectorAll('.p-highlight').forEach(e => e.classList.add('p-highlight_dark'))
            }, 0)
        },
        switchHandler() {
            document.querySelectorAll('.text').forEach(e => e.classList.add('text-dark'))
            document.querySelectorAll('.p-inputnumber-input').forEach(e => e.classList.add('p-inputnumber-input_dark'))
            document.querySelectorAll('.p-placeholder').forEach(e => e.classList.add('p-placeholder_dark'))
        },
        switchRemover() {
            document.querySelectorAll('.text-dark').forEach(e => e.classList.remove('text-dark'))
            document.querySelectorAll('.p-inputnumber-input_dark').forEach(e => e.classList.remove('p-inputnumber-input_dark'))
            document.querySelectorAll('.p-placeholder_dark').forEach(e => e.classList.remove('p-placeholder_dark'))
            document.querySelectorAll('.pi-chevron-down_dark').forEach(e => e.classList.remove('pi-chevron-down_dark'))
            document.querySelectorAll('.p-dropdown-item_dark').forEach(e => e.classList.remove('p-dropdown-item_dark'))
            document.querySelectorAll('.p-inputtext_dark').forEach(e => e.classList.remove('p-inputtext_dark'))
            document.querySelectorAll('.p-highlight_dark').forEach(e => e.classList.remove('p-highlight_dark'))
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
    }
}