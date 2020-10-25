
export const templates = {
    create: function (data = {}) {

        data.timeStart = data.timeStart || {}
        data.timeEnd = data.timeStart || {}
        return `
        <div class="modal-content">
            <div class="row">
                 <div class="title">
                    <div class="group">      
                        <input data-model="title" placeholder="Добавьте название" type="text" value="${data.title || ''}"/>
                        <span class="bar"></span>                
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="icon-wrapper">
                    <i class="material-icons">access_time</i>
                </div>
                
                <div class="field date">
                    <div class="group">      
                        <input class="datepicker" data-model="date" type="text" />
                        <span class="bar"></span>                
                    </div>
                </div>

                <div class="field time">
                    <div class="group">      
                        <input data-model="timeStart" value="${data.timeStart.hours}:${data.timeStart.minutes}"/>
                        <span class="bar"></span>                
                    </div>
                </div>
                <span>–</span>
                <div class="field time">
                    <div class="group">      
                        <input data-model="timeEnd" value="${data.timeEnd.hours}:${data.timeEnd.minutes}"/>
                        <span class="bar"></span>                
                    </div>
                </div>
                           
            </div>
        </div>
    `
    }
}
