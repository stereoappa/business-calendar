import {$} from "@core/dom";
import {toInlineStyles} from "@core/utils";
import {templates} from "@/widgets/modal.template";

export const Modals = {
    create: (options) => modal({
        template: templates.create,
        style: {margin: '250px auto'},
        ...options
    })
}

function modal (options) {
    const $modal = getRoot(options)

    let closing = false
    let destroyed = false
    let _datepicker = null

    const listener = event => {
        if(event.target.dataset.close){
            modal.close()
            modal.destroy()
        }

        if(event.target.dataset.save) {
            const res = {}
            $modal.findAll('[data-model]').forEach(el => {
                const $el = $(el)
                res[$el.attr('data-model')] = $el.val()
            })

            modal.close()
            options.callback(res)
            modal.destroy()
        }
    }

    $('#app').append($modal)
    $modal.on('click', listener)

    const modal = {
        open() {
            if(destroyed) {
                return console.warn('Modal is destroyed')
            }
            !closing && $modal.addClass('open')
        },
        close() {
            const ANIMATION_SPEED = 200
            closing = true
            $modal.removeClass('open')
            $modal.addClass('hide')
            setTimeout(() => {
                $modal.removeClass('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
        setData(data) {
            $modal.find('[data-modal=body]').html(options.template(data))

            _datepicker = $modal.find('.datepicker')
                .datepicker({
                    defaultDate: data.initialDate.toDate(),
                    dateFormat: 'l, j F'
                })
        },
        destroy() {
            $modal.remove()
            $modal.off(listener)
            _datepicker.destroy()
            destroyed = true
        }
    }
    return modal
}

function getRoot(options) {
    const $root = $.create('div', 'modal-layer')

    $root.$el.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" data-modal="window" style="${toInlineStyles(options.style) || ''}">
                <div class="modal-header" data-modal="header">
                    <span></span>
                    <span class="modal-close" data-close="true">&times;</span>
                </div>
                <div class="modal-body" data-modal="body">
                    ${options.template() || ''}
                </div>
                <div class="modal-footer" data-modal="footer">
                    <button data-save="true">Сохранить</button>
                </div>
            </div>
         </div>   
    `)

    return $root
}

