//現在のタブINDEXを把握し、次の有効なタブINDEXを取得
const focusMove = (doc, inputlist, isForward) => {
    try {
        if (!!doc.activeElement) {
            if (!!inputlist[doc.activeElement.name]) {
                var currentidx = inputlist[doc.activeElement.name].tabindex;

                var nextidx = currentidx + (isForward ? 1 : -1);

                for (let i = 0; i < Object.keys(inputlist).length; i++) {
                    var obj = inputlist[Object.keys(inputlist)[i]].ref.current;
                    if (!!obj
                        && !obj.readOnly
                        && inputlist[Object.keys(inputlist)[i]].tabindex == nextidx) {
                        //focus対象のコントールにフォーカス
                        obj.focus();
                        if (!!obj && !!obj.value && !!obj.value.length)
                            obj.setSelectionRange(0, obj.value.length);
                        break;
                    }

                }

            }
        }

    } catch (err) {
        console.log(err);
    }
}

export const keyfocuscontrol = (document, event, inputdata) => {

    switch (event.keyCode) {
        case "7":
            break;
        case 37://left
            // focusMove(document,inputdata,false);
            break;
        case 38://up
            event.preventDefault();
            focusMove(document, inputdata, false);
            break;
        case 39://right
            // focusMove(document,inputdata,true);

            break;
        case 13://enter
        case 40://down
            event.preventDefault();
            focusMove(document, inputdata, true);

            break;
    }
}

export const formatDateToText = (pdate) => {
    var dt = new Date(pdate);

    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
}


export default focusMove;
