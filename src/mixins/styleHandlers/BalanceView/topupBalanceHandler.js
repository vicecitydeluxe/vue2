export default {
    methods: {
        switchHandler() {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.text').forEach(e => e.classList.add('text-dark'))
        },
        switchRemover() {
            document.querySelectorAll('.p-inputtext-dark').forEach(e => e.classList.remove('p-inputtext-dark'))
            document.querySelectorAll('.text-dark').forEach(e => e.classList.remove('text-dark'))
        },
    },
}

