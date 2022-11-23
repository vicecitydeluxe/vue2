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
            document.querySelectorAll('.pi-calendar').forEach(e => e.classList.add('pi-calendar_dark'))
            document.querySelectorAll('.bottom_section_container').forEach(e => e.classList.add('bottom_section_container_dark'))
            document.querySelectorAll('.description').forEach(e => e.classList.add('description_dark'))
            document.querySelectorAll('.map_container_title').forEach(e => e.classList.add('map_container_title_dark'))
            document.querySelectorAll('.btn_left').forEach(e => e.classList.add('btn_left_dark'))
            document.querySelectorAll('.btn_right').forEach(e => e.classList.add('btn_right_dark'))
            document.querySelectorAll('.p-radiobutton-box').forEach(e => e.classList.add('p-radiobutton-box_dark'))
            document.querySelectorAll('.p-calendar').forEach(e => e.classList.add('p-calendar_dark'))
            document.querySelectorAll('.p-datepicker').forEach(e => e.classList.add('p-datepicker_dark'))
            document.querySelectorAll('.p-datepicker-header').forEach(e => e.classList.add('p-datepicker-header_dark'))
            document.querySelectorAll('.p-datepicker-year').forEach(e => e.classList.add('p-datepicker-year_dark'))
            document.querySelectorAll('.p-datepicker-month').forEach(e => e.classList.add('p-datepicker-month_dark'))
            document.querySelectorAll('.p-datepicker-next').forEach(e => e.classList.add('p-datepicker-next_dark'))
            document.querySelectorAll('.p-datepicker-prev').forEach(e => e.classList.add('p-datepicker-prev_dark'))
            document.querySelectorAll('.p-datepicker-trigger').forEach(e => e.classList.add('p-datepicker-trigger_dark'))
        },
        switchRemover() {
            const darkStylesSelectors = ['p-placeholder_dark', 'pi-chevron-down_dark',
                'p-dropdown-item_dark', 'p-inputtext_dark', 'p-highlight_dark',
                'pi-calendar_dark', 'bottom_section_container_dark',
                'description_dark', 'map_container_title_dark', 'btn_left_dark',
                'btn_right_dark', 'p-radiobutton-box_dark', 'p-calendar_dark',
                'p-datepicker_dark', 'p-datepicker-header_dark',
                'p-datepicker-month_dark', 'p-datepicker-next_dark',
                'p-datepicker-prev_dark', 'p-datepicker-year_dark']
            document.querySelectorAll('[class*="_dark"]')
                .forEach(e => e.classList.remove(...darkStylesSelectors))
        },
        calendarHandler() {
            setTimeout(() => {
                document.querySelectorAll('.p-calendar').forEach(e => e.classList.add('p-calendar_dark'))
                document.querySelectorAll('.p-datepicker').forEach(e => e.classList.add('p-datepicker_dark'))
                document.querySelectorAll('.p-datepicker-header').forEach(e => e.classList.add('p-datepicker-header_dark'))
                document.querySelectorAll('.p-datepicker-month').forEach(e => e.classList.add('p-datepicker-month_dark'))
                document.querySelectorAll('.p-datepicker-year').forEach(e => e.classList.add('p-datepicker-year_dark'))
                document.querySelectorAll('.p-datepicker-next').forEach(e => e.classList.add('p-datepicker-next_dark'))
                document.querySelectorAll('.p-datepicker-prev').forEach(e => e.classList.add('p-datepicker-prev_dark'))
            }, 0)
        },
    },
}

