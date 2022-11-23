export default {
    methods: {
        switchHandler() {
            document.querySelectorAll('.sticky').forEach(e => e.classList.add('sticky_dark'))
            document.querySelectorAll('.sticky_number__title').forEach(e => e.classList.add('sticky_number__title_dark'))
            document.querySelectorAll('.filter_header').forEach(e => e.classList.add('filter_header_dark'))
            document.querySelectorAll('.filter_header_divider').forEach(e => e.classList.add('filter_header_divider_dark'))
            document.querySelectorAll('.filter_container').forEach(e => e.classList.add('filter_container_dark'))
            document.querySelectorAll('.filter_container_wrapper').forEach(e => e.classList.add('filter_container_wrapper_dark'))
            document.querySelectorAll('.limit_header').forEach(e => e.classList.add('limit_header_dark'))
            document.querySelectorAll('.limit_container').forEach(e => e.classList.add('limit_container_dark'))
            document.querySelectorAll('.button_left').forEach(e => e.classList.add('button_left_dark'))
            document.querySelectorAll('.button_middle').forEach(e => e.classList.add('button_middle_dark'))
            document.querySelectorAll('.button_right').forEach(e => e.classList.add('button_right_dark'))
            document.querySelectorAll('.p-radiobutton-box').forEach(e => e.classList.add('p-radiobutton-box_dark'))
            document.querySelectorAll('.options_container_button').forEach(e => e.classList.add('options_container_button_dark'))
        },
        switchRemover() {
            const darkStylesSelectors = ['sticky_dark', 'sticky_number__title_dark',
                'filter_header_dark', 'filter_header_divider_dark',
                'filter_container_dark', 'filter_container_wrapper_dark',
                'limit_header_dark', 'limit_container_dark',
                'button_left_dark', 'button_middle_dark',
                'button_right_dark', 'p-radiobutton-box_dark', 'options_container_button'
            ]
            document.querySelectorAll('[class*="_dark"]')
                .forEach(e => e.classList.remove(...darkStylesSelectors))
        },
    },
}

