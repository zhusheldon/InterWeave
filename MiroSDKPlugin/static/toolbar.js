var client_id = "3074457360917723621"
var userId;
var USER_IS_WIZARD;
const wizardIds = ['3074457360917294320', '3074457360807760467']

miro.onReady(async () => {
    userId = await miro.currentUser.getId()
    USER_IS_WIZARD = wizardIds.includes(userId)

    if(USER_IS_WIZARD){
        let scrollableContent = document.getElementById('scrollable-content')
        let btndiv = document.createElement('div')
        btndiv.setAttribute('class', 'btnDiv')
        btndiv.addEventListener('click', topicWidgetBtnClicked)
        
        topicimage =document.createElement('input')
        topicimage.setAttribute('type', 'image')
        topicimage.setAttribute('height', '100px')
        topicimage.setAttribute('width', '100px')
        topicimage.setAttribute('class', 'btn')
        topicimage.src='/static/topicWidget.png'

        btndiv.appendChild(topicimage)

        topicp=document.createElement('p')
        topicp.setAttribute('class', 'btnLbl')
        topicp.appendChild(document.createTextNode('Add topic'))
        btndiv.appendChild(topicp)
        scrollableContent.prepend(btndiv)
    }
})

async function topicWidgetBtnClicked(){
    // <div class='btnDiv' onclick='addClusterGroup()'>
    //     <input type='image' src='/static/clusterGroup.png' height="100px" width="100px" class='btn'>
    //     <p class='btnLbl'>Add grouping</p>
    //   </div>
    
    let viewport = await miro.board.viewport.get()
    let centeredX = viewport.x + viewport.width / 2
    let centeredY = viewport.y + viewport.height / 2
    await miro.board.widgets.create({
        type: 'SHAPE',
        x: centeredX,
        y: centeredY,
        capabilities: {
            editable: true
        },
        metadata: {
            [client_id]: {
                type: 'Topic'
            }
        },
        clientVisible: true,
        width: 1000,
        height: 500,
        text: 'Topic Task: ',
        style: {
            backgroundOpacity: 0,
            borderColor: '#000000',
            borderStyle: 2,
            fontSize: 80,
            shapeType: miro.enums.shapeType.ROUNDER,
        }
    })
}

async function connectionLineBtnClicked(){
    let widgets=await miro.board.selection.get()
    widgets=widgets.filter(widget => Object.keys(widget.metadata).length==0
        ||Object.keys(widget.metadata[client_id]).length<=1)
    if(widgets.length!=2){
        miro.showNotification('Please select 2 text boxes/shapes/sticky notes to connect (You can select multiple items using the ctrl button).')
    }else{
        addLine(widgets[0].id, widgets[1].id)
    }
}

async function addLine(startWidgetId, endWidgetId) {
    miro.board.widgets.create({
        type: 'LINE',
        startWidgetId: startWidgetId,
        endWidgetId: endWidgetId,
        style: {
            lineColor: '#000000',
            lineEndStyle: miro.enums.lineArrowheadStyle.NONE,
            lineStartStyle: miro.enums.lineArrowheadStyle.NONE,
            lineStyle: miro.enums.lineStyle.DASHED,
            lineThickness: 3,
            lineType: 0,
        }
    })
}


async function addClusterGroup(){
    let viewport = await miro.board.viewport.get()
    let centeredX = viewport.x + viewport.width / 2
    let centeredY = viewport.y + viewport.height / 2
    await miro.board.widgets.create({
        type: 'SHAPE',
        x: centeredX,
        y: centeredY,
        capabilities: {
            editable: false
        },
        metadata: {
            [client_id]: {
                type: 'Cluster'
            }
        },
        clientVisible: true,
        width: 200,
        height: 200,
        style: {
            backgroundOpacity: 0,
            borderColor: '#000000',
            borderStyle: 1,
            shapeType: miro.enums.shapeType.ROUNDER,
        }
    })
}

async function addClusterTitle(){
    let viewport = await miro.board.viewport.get()
    let centeredX = viewport.x + viewport.width / 2
    let centeredY = viewport.y + viewport.height / 2
    await miro.board.widgets.create({
        type: 'TEXT',
        x: centeredX,
        y: centeredY,
        scale:4,
        metadata: {
            [client_id]:{
                type: 'ClusterTitle'
            }
        },
        style: {
            backgroundColor: '#FFFF00',
            highlighting: 'yellow'
        }
    })
}

