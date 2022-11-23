export default {
    methods: {
        dataHandler() {
            setTimeout(() => {
                document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
                document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
                document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
                document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
            }, 0)
        },
        switchHandler() {
            document.querySelectorAll('.p-fluid').forEach(e => e.classList.add('p-fluid-dark'))
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-float-label').forEach(e => e.classList.add('p-float-label-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-inputwrapper-focus').forEach(e => e.classList.add('p-inputwrapper-focus-dark'))
            document.querySelectorAll('.p-inputwrapper-filled').forEach(e => e.classList.add('p-inputwrapper-filled-dark'))
            document.querySelectorAll('.p-button').forEach(e => e.classList.add('p-button-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.p-component').forEach(e => e.classList.add('p-component-dark'))
            document.querySelectorAll('.p-filled').forEach(e => e.classList.add('p-filled-dark'))
            document.querySelectorAll('.p-invalid').forEach(e => e.classList.add('p-invalid-dark'))
        },
        switchRemover() {
            const darkStylesSelectors = ['p-fluid-dark', 'p-inputtext-dark',
                'p-float-label-dark', 'p-filled-dark',
                'p-inputwrapper-focus-dark', 'p-inputwrapper-filled-dark',
                'p-button-dark', 'p-component-dark']
            document.querySelectorAll('[class*="-dark"]')
                .forEach(e => e.classList.remove(...darkStylesSelectors))
        },
    },
}

