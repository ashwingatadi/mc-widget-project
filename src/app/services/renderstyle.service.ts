import {Injectable } from '@angular/core';

@Injectable()
export class RenderStyleService {
  private widgetclassesSplited: String[];
  private widgetstylesSplited: String[];
  public widgetstylenew;
  customStyle: Object;
  //apiUrl: string;
  constructor() { }

  renderStyle(compElem,widgetclasses,widgetstyles,renderer) {

    var selectedElemDivAll = compElem.getElementsByTagName('div');
    var selectedElemDiv = selectedElemDivAll[0];

    if (widgetclasses) { // validation check for attributes in component definition
      this.widgetclassesSplited = widgetclasses.split(',');
    }

    if (widgetstyles){ // validation check for attributes in component definition
      this.widgetstylesSplited = widgetstyles.split(',');
    }

    //  Class for individual component elements
    if (this.widgetclassesSplited) { // parent block validation
      for (var i = 0; i < this.widgetclassesSplited.length; i++) {

        var idx = this.widgetclassesSplited[i].indexOf('.');
        var element = this.widgetclassesSplited[i].substring(0, idx);
        var elemClass = this.widgetclassesSplited[i].substring(idx + 1, this.widgetclassesSplited[i].length);

        //var currentWidget = document.getElementById('WidgetComponent');  // get component html
        if (element !== 'div') {  // code for non divs
          //var selectedElemNonDiv = currentWidget.querySelectorAll(element);
          var selectedElemNonDiv = compElem.getElementsByTagName(element);
          if (selectedElemNonDiv.length === 1) { // if only 1 elem
            renderer.addClass(selectedElemNonDiv['0'], elemClass);
            //selectedElemNonDiv['0'].classList.add(elemClass);
          }
          else {
            for (var j = 0; j < selectedElemNonDiv.length; j++) {
              // for loop
              var currIdx = selectedElemNonDiv[j];
              renderer.addClass(currIdx, elemClass);
              //currIdx.classList.add(elemClass);
            }
          }
        } else { // add class to div parent  element
          renderer.addClass(selectedElemDiv, elemClass);
          var popupElementClass = document.querySelector("div[model-dentifier='identifymodal']");
          if (popupElementClass) {
            renderer.addClass(popupElementClass, elemClass);
          }
        }
      }  // for loop end
    } // parent block validation check end

    // Inline style for individual or entire component
    if (widgetstyles) {
      if (widgetstyles.charAt(0) === '{') {
        this.widgetstylenew = this.parseToObject(widgetstyles);
        return this.widgetstylenew;
      }
      else {
        for (var l = 0; l < this.widgetstylesSplited.length; l++) {
          var idx = this.widgetstylesSplited[l].indexOf('.');

          var element = this.widgetstylesSplited[l].substring(0, idx);
          var elemStyle = this.widgetstylesSplited[l].substring(idx + 1, this.widgetstylesSplited[l].length);
          elemStyle = elemStyle.replace(/[{()}]/g, '');
          //refactor style
          var elemStyleSpilted = elemStyle.split(';');

          if (element.indexOf('#') === -1) {
            var currentWidget = document.getElementById('WidgetComponent'); // get component html
            if (element !== 'div') {  // code for non divs
              var selectedElemNonDiv = compElem.getElementsByTagName(element); // select non
              if (selectedElemNonDiv.length === 1) { // if only 1 elem
                elemStyleSpilted.forEach(item => {
                  var colunIdx = item.indexOf(':');
                  var stylepop = item.substring(0, colunIdx); //beforecolun
                  var styleval = item.substring(colunIdx + 1, item.length); //aftercolun
                  renderer.setStyle(selectedElemNonDiv['0'], stylepop, styleval);
                });

              } else {
                for (var m = 0; m < selectedElemNonDiv.length; m++) {
                  // for loop
                  var currIdx = selectedElemNonDiv[m];

                  elemStyleSpilted.forEach(item => {
                    var colunIdx = item.indexOf(':');
                    var stylepop = item.substring(0, colunIdx); //beforecolun
                    var styleval = item.substring(colunIdx + 1, item.length); //aftercolun
                    renderer.setStyle(currIdx, stylepop, styleval);
                  });

                }
              }
            } else if (element === 'div') { // add style to parent div
              renderer.setProperty(selectedElemDiv, 'style', elemStyle);
              var popupElementStyle = document.querySelector("div[model-dentifier='identifymodal']");
              if (popupElementStyle) {
                renderer.setProperty(popupElementStyle, 'style', elemStyle);
              }
            }
          } else {
            var hashIdx = element.indexOf('#');
            var beforeHashElem = element.substring(0, hashIdx);
            var afterHashElemIdentifier = element.substring(hashIdx + 1, element.length);

            var catchIdentifier = '' + beforeHashElem + '[identifier=' + afterHashElemIdentifier + ']';

            var elemFromDom = document.querySelectorAll(catchIdentifier);

            if (elemFromDom.length === 1) {
              elemStyleSpilted.forEach(item => {
                var colunIdx = item.indexOf(':');
                var stylepop = item.substring(0, colunIdx); //beforecolun
                var styleval = item.substring(colunIdx + 1, item.length); //aftercolun
                renderer.setStyle(elemFromDom['0'], stylepop, styleval);
              });
            } else {
              for (var e = 0; e < elemFromDom.length; e++) {
                elemStyleSpilted.forEach(itemy => {
                  var colunIdx = itemy.indexOf(':');
                  var stylepop = itemy.substring(0, colunIdx); //beforecolun
                  var styleval = itemy.substring(colunIdx + 1, itemy.length); //aftercolun
                  renderer.setStyle(elemFromDom[e], stylepop, styleval);
                });
              }
            }
          }
        } // end of foor loop
      } // end of 2nd else  loop
    } // end of 1st main else  loop
  }

  parseToObject(str: string) {
    str = str.replace(/[{()}]/g, '');

    let splStr: string[] = str.split(';');
    var keys = [];
    var vals = [];
    var num = 0;
    let frmtedStr: string = '';

    splStr.forEach(str => {
      if (str) {
        let stlSpl = str.split(":");
        keys.push(stlSpl[0]);
        vals.push(stlSpl[1]);
        num++;
      }
    });

    frmtedStr = frmtedStr + "{";
    for (let i = 0; i < num; i++) {
      frmtedStr = frmtedStr + "\"" + keys[i].trim() + "\":\"" + vals[i].trim() + "\"";
      if (i != num - 1) {
        frmtedStr = frmtedStr + ",";
      }
    }
    frmtedStr = frmtedStr + "}";
    this.customStyle = JSON.parse(frmtedStr);
    return this.customStyle;
  }

}
