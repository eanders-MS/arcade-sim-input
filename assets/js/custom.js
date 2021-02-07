/**
 * This will be loaded before starting the simulator.
 * If you wish to add custom javascript, 
 * ** make sure to add this line to pxt.json**
 * 
 *      "disableTargetTemplateFiles": true
 * 
 * otherwise MakeCode will override your changes.
 * 
 * To register a constrol simmessages, use addSimMessageHandler
 */

document.addEventListener("DOMContentLoaded", async function () {

    try {
        const simFrame = await waitForExist(document, "#simframe");
        simFrame.addEventListener('load', async () => {
            const gameScreen = await waitForExist(simFrame.contentWindow.document, "#game-screen");
            gameScreen.addEventListener("mousemove", ev => {
                simFrame.contentWindow.postMessage({
                    type: 'messagepacket',
                    channel: 'mouse',
                    data: {
                        type: 'move',
                        x: ev.offsetX,
                        y: ev.offsety
                    }
                }, "*");
            });
        });
    } catch (e) {
        console.log(e.toString());
    }
});

async function waitForExist(doc, selector) {
    return new Promise((resolve, reject) => {
        const getSimFrame = () => {
            let elem = doc.querySelector(selector);
            if (elem) return resolve(elem);
            window.setTimeout(getSimFrame, 500);
        };
        getSimFrame();
    });
}