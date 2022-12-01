export default {
    methods: {
        switchHandler() {
            document.querySelectorAll('.p-inputtext').forEach(e => e.classList.add('p-inputtext-dark'))
            document.querySelectorAll('.text').forEach(e => e.classList.add('text-dark'))
            document.querySelectorAll('.btn_left').forEach(e => e.classList.add('btn_left_dark'))
            document.querySelectorAll('.btn_mid').forEach(e => e.classList.add('btn_mid_dark'))
            document.querySelectorAll('.btn_right').forEach(e => e.classList.add('btn_right_dark'))
        },
        switchRemover() {
            document.querySelectorAll('.p-inputtext-dark').forEach(e => e.classList.remove('p-inputtext-dark'))
            document.querySelectorAll('.text-dark').forEach(e => e.classList.remove('text-dark'))
            document.querySelectorAll('.btn_left_dark').forEach(e => e.classList.remove('btn_left_dark'))
            document.querySelectorAll('.btn_mid_dark').forEach(e => e.classList.remove('btn_mid_dark'))
            document.querySelectorAll('.btn_right_dark').forEach(e => e.classList.remove('btn_right_dark'))
        },
    },
}

