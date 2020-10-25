import '@/scss/index.scss'
import {Router} from "@core/routes/Router";

import moment from "moment";
import 'moment/locale/ru';

moment.updateLocale('ru', {
    months : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdaysMin : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
});


moment.locale('ru')
moment.weekdays(true)

import {Russian} from "flatpickr/dist/l10n/ru.js"
flatpickr.localize(Russian);

new Router('#app')

