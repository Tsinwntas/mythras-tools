/*
 * Copyright (c) 1997-2022 IDRsolutions (https://www.idrsolutions.com)
 */

var idrform = new IDRFORM();

var idrscript = {};

function IDRFORM() {
    var doc = new Doc();
    var app = new App();
    var event = new Event();

    var AVAILCALCULATES = {};
    var AVAILVALIDATES = {};

    this.app = app;
    this.doc = doc;

    window.getField = function(n) { // needed in doc level script HTML:3621
        return doc.getField(n);
    }

    var AVAILSCRIPTS = {
        A: "click",
        K: "keyup",
        C: "calculate",
        V: "validate",
        F: "format",
        Fo: "focus", Bl: "blur",
        D: "mousedown", U: "mouseup", E: "mouseenter", X: "mouseexit"
    };
    var AVAILSELECTS = {
        A: "change",
        K: "change",
        Fo: "focus", Bl: "blur",
        D: "mousedown", U: "mouseup", E: "mouseenter", X: "mouseexit"
    };
    var AVAILRADIOCHECKS = {
        A: "click",
        K: "click",
        Fo: "focus", Bl: "blur",
        D: "mousedown", U: "mouseup", E: "mouseenter", X: "mouseexit"
    };

    this.init = function () {
        var dd = document.getElementById("FDFXFA_FormType");
        if (dd) {
            app.isAcroForm = dd.textContent === "FDF" || dd.textContent === "AcroForm";
        }
        dd = document.getElementById("FDFXFA_Processing");
        if (dd) {
            dd.style.display = "none";
        }
        if (idrscript.documentscript) {
            try {
                window.eval(atob(idrscript.documentscript)); // html:3621
            } catch (err) {
                console.log(err);
            }
        }
        if (idrscript.pagescript) {
            idrform.exec(idrscript.pagescript);
        }
        var inputs = document.getElementsByTagName("input");
        var selects = document.getElementsByTagName("select");
        var textareas = document.getElementsByTagName("textarea");
        for (var i = 0, ii = inputs.length; i < ii; i++) {
            var ele = inputs[i];
            var type = ele.getAttribute("type");
            for (var n in AVAILSCRIPTS) {
                var fid = ele.getAttribute("id");
                var id = fid + "_" + n;
                if (id in idrscript) {
                    if (n === "F") {
                        var prevBlur = ele.getAttribute("onBlur");
                        if (prevBlur) {
                            ele.setAttribute("onBlur", prevBlur + "; idrform.exec(idrscript." + id + ",event)");
                        } else {
                            ele.setAttribute("onBlur", "idrform.exec(idrscript." + id + ",event)");
                        }

                    }else if (n === "C") {
                        AVAILCALCULATES[fid] = atob(idrscript[id]);
                    } else if (n === "V") {
                        AVAILVALIDATES[fid] = atob(idrscript[id]);
                    } else if (type === "radio" || type === "checkbox") {
                        ele.setAttribute("on" + AVAILSCRIPTS[n], "idrform.exec(idrscript." + id + ",event)");
                    } else {
                        ele.setAttribute("on" + AVAILRADIOCHECKS[n], "idrform.exec(idrscript." + id + ",event)");
                    }
                } else if (n === "Bl") {
                    var prevBlur = ele.getAttribute("onBlur");
                    if (prevBlur) {
                        ele.setAttribute("onblur", prevBlur + "; idrform.doc.calculateNow()");
                    } else if(type != "button") {
                        if (type === "radio") {
                            ele.setAttribute("onChange", "idrform.doc.calculateNow()");
                        } else {
                            ele.setAttribute("onblur", "idrform.doc.calculateNow()");
                        }
                    }
                }
            }

            if (ele.dataset.hide) {
                if (type === "radio") {
                    ele.addEventListener("click", this._hideEvent);
                }
            }
            if (ele.dataset.show) {
                if (type === "radio") {
                    ele.addEventListener("click", this._showEvent);
                }
            }
        }
        for (var i = 0, ii = selects.length; i < ii; i++) {
            var ele = selects[i];
            for (var n in AVAILSCRIPTS) {
                var id = ele.getAttribute("id") + "_" + n;
                if (id in idrscript) {
                    ele.setAttribute("on" + AVAILSELECTS[n], "idrform.exec(idrscript." + id + ",event)");
                } else if (n === "Bl") {
                    ele.setAttribute("onblur", "idrform.doc.calculateNow()");
                }
            }
        }
        for (var i = 0, ii = textareas.length; i < ii; i++) {
            var ele = textareas[i];
            for (var n in AVAILSCRIPTS) {
                var id = ele.getAttribute("id") + "_" + n;
                var fid = ele.getAttribute("id");
                if (id in idrscript) {
                    ele.setAttribute("on" + AVAILSCRIPTS[n], "idrform.exec(idrscript." + id + ",event)");
                } else if (n === "Bl") {
                    ele.setAttribute("onblur", "idrform.doc.calculateNow()");
                }
            }
        }
        doc.calculateNow();
    };

    this.exec = function (script, htmlEvent) {
//        console.log(atob(script));
        this.doc.exec(atob(script), htmlEvent);
        this.doc.calculateNow();
    };
    this.execMenuItem = function (str) {
        this.app.execMenuItem(str);
    };
    this.submitForm = function (str) {
        this.doc.submitForm(str);
    };

    this._hideEvent = function (event) {
        if (!event.target || !event.target.dataset || !event.target.dataset.hide) {
            return;
        }

        var hideElements = event.target.dataset.hide.split(' ');
        for (var i = 0; i < hideElements.length; i++) {
            idrform.doc.getField(hideElements[i]).display = display.hidden;
        }
    };

    this._showEvent = function (event) {
        if (!event.target || !event.target.dataset || !event.target.dataset.show) {
            return;
        }

        var showElements = event.target.dataset.show.split(' ');
        for (var i = 0; i < showElements.length; i++) {
            idrform.doc.getField(showElements[i]).display = display.visible;
        }
    };

// constant definitions
    var AnnotationType = {
        Caret: "Caret", Circle: "Circle", FileAttachment: "FileAttachment",
        FreeText: "FreeText", Highlight: "Highlight", Ink: "Ink", Link: "Link", Line: "Line",
        Polygon: "Polygon", PolyLine: "PolyLine", Sound: "Sound", Square: "Square",
        Squiggly: "Squiggly", Stamp: "Stamp", StrikeOut: "StrikeOut", Text: "Text",
        Underline: "Underline"
    };
    var border = {s: "solid", d: "dashed", b: "beveled", i: "inset", u: "underline"};
    var cursor = {visible: 0, hidden: 1, delay: 2};
    var display = {visible: 0, hidden: 1, noPrint: 2, noView: 3};
    var font = {
        Times: "Times-Roman", TimesB: "Times-Bold", TimesI: "Times-Italic",
        TimesBI: "Times-BoldItalic",
        Helv: "Helvetica", HelvB: "Helvetica-Bold", HelvI: "Helvetica-Oblique",
        HelvBI: "Helvetica-BoldOblique",
        Cour: "Courier", CourB: "Courier-Bold", CourI: "Courier-Oblique",
        CourBI: "Courier-BoldOblique",
        Symbol: "Symbol", ZapfD: "ZapfDingbats",
        KaGo: "HeiseiKakuGo-W5-UniJIS-UCS2-H",
        KaMi: "HeiseiMin-W3-UniJIS-UCS2-H"
    };
    var highlight = {n: "none", i: "invert", p: "push", o: "outline"};
    var position = {
        textOnly: 0, iconOnly: 1, iconTextV: 2, textIconV: 3, iconTextH: 4,
        textIconH: 5, overlay: 6
    };
    var style = {
        ch: "check", cr: "cross", di: "diamond", ci: "circle", st: "star", sq: "square"
    };
    var trans = {
        blindsH: "BlindsHorizontal", blindsV: "BlindsVertical", boxI: "BoxIn",
        boxO: "BoxOut", dissolve: "Dissolve", glitterD: "GlitterDown",
        glitterR: "GlitterRight", glitterRD: "GlitterRightDown", random: "Random",
        replace: "Replace", splitHI: "SplitHorizontalIn",
        splitHO: "SplitHorizontalOut", splitVI: "SplitVerticalIn",
        splitVO: "SplitVerticalOut", wipeD: "WipeDown", wipeL: "WipeLeft",
        wipeR: "WipeRight", wipeU: "WipeUp"
    };
    var zoomType = {
        none: "NoVary", fitP: "FitPage", fitW: "FitWidth", fitH: "fitHeight",
        fitV: "fitVisibleWidth", pref: "Preferred", refW: "ReflowWidth"
    };

    var DS_GREATER_THAN = "Invalid value: must be greater than or equal to %s.";
    var IDS_GT_AND_LT = "Invalid value: must be greater than or equal to %s and less than or equal to %s.";
    var IDS_LESS_THAN = "Invalid value: must be less than or equal to %s.";
    var IDS_INVALID_MONTH = "** Invalid **";
    var IDS_INVALID_DATE2 = "should match format";
    var IDS_INVALID_VALUE = "The value entered does not match the format of the field";

    function AFExecuteThisScript(pdd, cScript, pRetValue) {
        console.log("method not defined contact - IDR SOLUTIONS");
        return event.rc;
    }
    function AFImportAppearance(cd, coIcon, avd, cTitle) {
        console.log("method not defined contact - IDR SOLUTIONS");
        return true;
    }
    function AFLayoutBorder(vLayout, border, pdcvBrdr, pdcvBg, bDown) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFLayoutCreateStream(vLayout) {
        console.log("method not defined contact - IDR SOLUTIONS");
        return null;
    }
    function AFLayoutDelete(vLayout) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFLayoutNew(frBbox, annotRotation, cd) {
        console.log("method not defined contact - IDR SOLUTIONS");
        return null;
    }
    function AFLayoutText(vlayout, bMultline, bWrap, border, ta, cBytes) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDDocEnumPDFields(doc, terminals, no_repeat, proc, clientData) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDDocGetPDFieldFromName(doc, name) {
        return doc.getField(name);
    }
    function AFPDDocLoadPDFields(doc) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDFieldFromCosObj(dict) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDFieldGetCosObj(fldP) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDFieldGetDefaultTextAppearance(fldP, aP) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDFieldGetFlags(fldP, flagType) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDFieldGetName(fldP) {
        return fldP.name;
    }
    function AFPDFieldGetValue(fldP) {
        return fldP.value;
    }
    function AFPDFieldIsAnnot(fldP) {
        console.log("AFPDFieldIsAnnot not defined contact - IDR SOLUTIONS");
        return false;
    }
    function AFPDFieldIsTerminal(fldP) {
        console.log("AFPDFieldIsTerminal not defined contact - IDR SOLUTIONS");
        return true;
    }
    function AFPDFieldIsValid(fldP) {
        console.log("AFPDFieldIsValid not defined contact - IDR SOLUTIONS");
        return true;
    }
    function AFPDFieldReset(fldP) {
        console.log("AFPDFieldReset not defined contact - IDR SOLUTIONS");
    }
    function AFPDFieldSetDefaultTextAppearance(fldP, aP) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDFieldSetFlags(fldP, flagType, flags) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDFieldSetOptions(fldP, array) {
        console.log("method not defined contact - IDR SOLUTIONS");
        return "Good";
    }
    function AFPDFieldSetValue(fldP, val) {
        fldP.value = val;
    }
    function AFPDFormFromPage(cd, pdp) {
        console.log("method not defined contact - IDR SOLUTIONS");
        return null;
    }
    function AFPDWidgetGetAreaColors(pdan, borderP, bkgndP) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDWidgetGetBorder(pdan, pdwb) {
        console.log("method not defined contact - IDR SOLUTIONS");
        return true;
    }
    function AFPDWidgetGetRotation(pdan) {
        console.log("method not defined contact - IDR SOLUTIONS");
        return null;
    }
    function AFPDWidgetSetAreaColors(pdan, borderP, bkgndP) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPDWidgetSetBorder(pdan, pdwb) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFSimple_Calculate(cFunction, cFields) {
        var res = 0;
        var len = cFields.length;
        switch (cFunction) {
            case "AVG":
                for (var i = 0; i < len; i++) {
                    var field = doc.getField(cFields[i]);
                    if (field == null || field.value == null) {
                        continue;
                    }
                    res += Number(doc.getField(cFields[i]).value);
                }
                res /= len;
                break;
            case "MIN":
                res = doc.getField(cFields[0]).value;
                for (var i = 1; i < len; i++) {
                    res = Math.min(res, doc.getField(cFields[i]).value);
                }
                break;
            case "MAX":
                res = doc.getField(cFields[0]).value;
                for (var i = 1; i < len; i++) {
                    res = Math.max(res, doc.getField(cFields[i]).value);
                }
                break;
            case "PRD":
                res = 1;
                for (var i = 0; i < len; i++) {
                    res *= doc.getField(cFields[i]).value;
                }
                break;
            case "SUM":
                for (var i = 0; i < len; i++) {
                    var field = doc.getField(cFields[i]);
                    if (field == null || field.value == null) {
                        continue;
                    }
                    res += Number(doc.getField(cFields[i]).value);
                }
                break;
        }
        return res;
    }
    function AFDate_KeystrokeEx(cFormat) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFDate_Format(cFormat) {
        var cPattern = cFormat;
        var cText = event.value;
        var temp = "" + cText;
        if(cText != null && temp.length > 0) {
            var res = util.scand(cPattern, cText);
            if (res == null) {
                var msg = "Invalid date/time: please ensure that the date/time exists. Field [" + event.target.name + "] should match the format " + cPattern;
                alert(msg);
                event.value = null;
            }
        }
    }
    function AFDate_FormatEx(cFormat) {
        AFDate_Format(cFormat);
    }
    function AFTime_Keystroke(ptf) {
        AFTime_Format(ptf)
    }
    function AFTime_Format(ptf) {
        var cPattern = cFormat;
        var cText = event.value;
        var res = util.scand(cPattern, cText);
        if (res == null) {
            var msg = "Invalid date/time: please ensure that the date/time exists. Field [" + event.target.name + "] should match the format " + cPattern;
            alert(msg);
            event.value = null;
        }
    }
    function AFPercent_Keystroke(nDec, sepStyle) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFPercent_Format(nDec, sepStyle) {
        if (typeof nDec !== "number") {
            return;
        }
        if (typeof sepStyle !== "number") {
            return;
        }
        if (nDec < 0) {
            alert("Invalid nDec value in AFPercent_Format");
            event.value = null;
        }
        if (nDec > 512) {
            event.value = "%";
            return;
        }
        nDec = Math.floor(nDec);
        sepStyle = Math.min(Math.max(0, Math.floor(sepStyle)), 4);
        var value = AFMakeNumber(event.value);
        if (value === null) {
            event.value = "%";
            return;
        }
        event.value = (value * 100) + "%";
    }
    function AFSpecial_Keystroke(psf) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AFSpecial_Format(psf) {
        psf = AFMakeNumber(psf);
        var formatStr;
        switch (psf) {
            case 0:
                formatStr = "99999";
                break;
            case 1:
                formatStr = "99999-9999";
                break;
            case 2:
                var value = "" + event.value;
                if (value.length > 8 || value.startsWith("(")) {
                    formatStr = "(999) 999-9999";
                } else {
                    formatStr = "999-9999";
                }
                break;
            case 3:
                formatStr = "999-99-9999";
                break;
            default:
                alert("Invalid psf in AFSpecial_Keystroke");
                return;
        }
        event.value = util.printx(formatStr, event.value);
    }
    function  AFMakeNumber(str) {
        if (typeof str === "number") {
            return str;
        }
        if (typeof str !== "string") {
            return null;
        }
        str = str.trim().replace(",", ".");
        const number = parseFloat(str);
        if (isNaN(number) || !isFinite(number)) {
            return null;
        }
        return number;
    }
    function AFNumber_Format(nDec, sepStyle, negStyle, currStyle, strCurrency, bCurrencyPrepend) {
        var value = event.value;
        value = AFMakeNumber(value);
        if (value  == null) {
            return;
        }
        event.value = value;
    }
    function AFNumber_Keystroke(nDec, sepStyle, negStyle, currStyle, strCurrency, bCurrencyPrepend) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function AssembleFormAndImportFDF(pdCurrForm, cdFDF, bAddToCurr) {
        console.log("method not defined contact - IDR SOLUTIONS");
        return doc;
    }
    function ExportAsFDF(pdForm, rgIncExcFlds, bIncl, bEmpty, bMenu, bLoadFields, fdfPath) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function ExportAsFDFEx(pdForm, rgIncExcFlds, bIncl, bEmpty, bMenu, bLoadFields, fdfPath, submitBtnName) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function ExportAsFDFWithParams(params) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function ExportAsHtml(formPD, rgIncExcFlds, bIncl, bEmpty, Hfile) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function ExportAsHtmlEx(pdForm, rgIncExcFlds, bIncl, bEmpty, Hfile, submitBtnName) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function ImportAnFDF(pdForm, cdFDF) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function IsPDDocAcroForm(doc) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }
    function ResetForm(formPD, rgIncExcFlds, bIncl) {
        console.log("method not defined contact - IDR SOLUTIONS");
    }

    function App() {
        this.isAcroForm = true;
        this.activeDocs = [doc];
        this.calculate = true;
        this.contstants = null;
        this.focusRect = true;
        this.formsVersion = 6.0;
        this.fromPDFConverters = new Array();
        this.fs = new FullScreen();
        this.fullScreen = false;
        this.language = "ENU";
        this.media = new Media();
        this.monitors = {};
        this.numPlugins = 0;
        this.openInPlace = false;
        this.platform = "WIN";
        this.plugins = new Array();
        this.printColorProfiles = new Array();
        this.printNames = new Array();
        this.runtimeHighlight = false;
        this.runtimeHightlightColor = new Array();
        this.thermometer = new Thermometer();
        this.toolBar = false;
        this.toolBarHorizontal = false;
        this.toolBarVertical = false;
        this.viewerType = "Exchange-Pro";
        this.viewerVariation = "Full";
        this.viewerVersion = 6.0;
        this.addMenuItem = function () {
            console.log("addMenuItem method not defined contact - IDR SOLUTIONS");
        };
        this.addSubMenu = function () {
            console.log("addSubMenu method not defined contact - IDR SOLUTIONS");
        };
        this.addToolButton = function () {
            console.log("addToolButton method not defined contact - IDR SOLUTIONS");
        };
        this.alert = function (cMsg, nIcon, nType, cTitle, oDoc, oCheckbox) {
            var obj = {cMsg: cMsg, nIcon: 0, nType: 0, cTitle: "Adobe Acrobat", oDoc: null, oCheckBox: null};
            if (cMsg instanceof Object) {
                for (var property in cMsg) {
                    obj[property] = cMsg[property];
                }
            }

            if (nType !== undefined) {
                obj.nType = nType;
            }
            switch (obj.nType) {
                case 0:
                    window.alert(obj.cMsg);
                    return;
                case 1:
                case 2:
                case 3:
                    return window.confirm(obj.cMsg);
            }
        };
        this.beep = function () {
            var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
            snd.play();
        };
        this.beginPriv = function () {
            console.log("beginPriv method not defined contact - IDR SOLUTIONS");
        };
        this.browseForDoc = function () {
            console.log("browseForDoc method not defined contact - IDR SOLUTIONS");
        };
        this.clearInterval = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.clearTimeOut = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.endPriv = function () {
            console.log("endPriv method not defined contact - IDR SOLUTIONS");
        };
        this.execDialog = function () {
            console.log("execDialog method not defined contact - IDR SOLUTIONS");
            //read page 106 for dialog box handling as it is major subject to be implemented
        };
        this.execMenuItem = function (str, fn) {
            var totalPages = document.getElementsByClassName("pageArea").length;
            var sParam = str.toUpperCase();
            if (sParam === "SAVEAS") {
                if (this.isAcroForm) {
                    EcmaParser.saveFormToPDF(fn);
                } else {
                    createXFAPDF();
                }
            } else if (sParam === "PRINT") {
                this.activeDocs[0].print();
            } else if (sParam === "FIRSTPAGE") {
                this.activeDocs[0].pageNum = 0;
            } else if (sParam === "PREVPAGE") {
                this.activeDocs[0].pageNum--;
            } else if (sParam === "NEXTPAGE") {
                this.activeDocs[0].pageNum++;
            } else if (sParam === "LASTPAGE") {
                this.activeDocs[0].pageNum = totalPages - 1;
            }
        };

        this.getNthPluginName = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.getPath = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.goBack = function () {
            this.activeDocs[0].pageNum--;
        };
        this.goForward = function () {
            this.activeDocs[0].pageNum++;
        };
        this.hideMenuItem = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.hideToolbarButton = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.launchURL = function (v, bNewFrame) {
            app.activeDocs[0].getURL(v);
        };
        this.listMenuItems = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.listToolbarButtons = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.mailGetAddrs = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.mailMsg = function (bUI, cTo, cCc, cBcc, cSubject, cMsg) {
            var mail = "mailto:";
            mail += cTo.split(";").join(",");
            var addedExtras = false;
            if (cCc) {
                addedExtras = true;
                mail += "?cc=";
                mail += cCc.split(";").join(",");
            }
            if (cBcc) {
                if (!addedExtras) {
                    addedExtras = true;
                    mail += "?";
                } else {
                    mail += "&";
                }
                mail += cBcc.split(";").join(",");
            }
            if (cSubject) {
                if (!addedExtras) {
                    addedExtras = true;
                    mail += "?";
                } else {
                    mail += "&";
                }
                mail += cSubject.split(" ").join("%20");
            }
            if (cMsg) {
                if (!addedExtras) {
                    addedExtras = true;
                    mail += "?";
                } else {
                    mail += "&";
                }
                mail += cMsg.split(" ").join("%20");
            }
            window.location.href = mail;
        };
        this.mailGetAddrs = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.newDoc = function () {
            return new Doc();
        };
        this.newFDF = function () {
            return new FDF();
        };
        this.openDoc = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.openFDF = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.popUpMenu = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.popUpMenuEx = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.removeToolButton = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.response = function (p1, p2, p3, p4) {
            var res;
            if (p2) {
                res = window.prompt(p1, p2);
            } else {
                res = window.prompt(p1);
            }
            return res;
        };
        this.setInterval = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.setTimeOut = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.trustedFunction = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.trustPropagatorFunction = function () {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
    }

    console.println = function (val) {
        console.log(val);
    };


    function Doc() {
        //custom addition
        this.pages = [];

        this.alternatePresentations = {};
        this.author = "";
        this.baseURL = "";
        this.bookmarkRoot = {};
        this.calculate = false;
        this.creationDate = new Date();
        this.creator = "";
        this.dataObjects = [];
        this.delay = false;
        this.dirty = false;
        this.disclosed = false;
        this.docID = [];
        this.documentFileName = "";
        this.dynamicXFAForm = false;
        this.external = true;
        this.fileSize = 0; //should be in bytes
        this.hidden = false;
        this.hostContainer = {};
        this.icons = [];
        this.info = {};
        this.innerAppWindowRect = [];
        this.innerDocWindowRect = [];
        this.isModal = false;
        this.keywords = {};
        this.layout = "";
        this.media = {};
        this.metadata = "";
        this.modDate = new Date();
        this.mouseX = 0;
        this.mouseY = 0;
        this.noautoComplete = false;
        this.nocache = false;
        this.numPages = 0;
        this.numTemplates = 0;
        this.path = "";
        this.outerAppWindowRect = [];
        this.outerDocWindowRect = [];
        this.pageNum = 0;
        this.pageWindowRect = [];
        this.permStatusReady = false;
        this.producer = "PDFWriter";
        this.requiresFullSave = false;
        this.securityHandler = "";
        this.selectedAnnots = [];
        this.sounds = [];
        this.spellDictionaryOrder = [];
        this.spellLanguageOrder = [];
        this.subject = "";
        this.templates = [];
        this.title = "";
        this.URL = "";
        this.viewState = {};
        this.xfa = {};
        this.XFAForeground = false;
        this.zoom = 100;
        this.zoomType = "novary";
        this.exec = function (scr, htmlEvent) {
            try {
                console.log(htmlEvent);
                event.htmlEvent = htmlEvent;
                eval(scr);
            } catch (err) {
                console.log(err);
            }
        }
    }
    Object.defineProperty(Doc.prototype, "addAnnot", {
        value: function (annotObj) {
            console.log("addAnnot method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "addField", {
        value: function (cName, cFieldType, nPage, oCoords) {
            var pages = document.getElementsByClassName('pageArea');
            var ele;
            switch (cFieldType) {
                case "text":
                    ele = document.createElement("input");
                    ele.setAttribute("type", "text");
                    break;
                case "button":
                    ele = document.createElement("button");
                    break;
                case "combobox":
                    ele = document.createElement("select");
                    break;
                case "listbox":
                    ele = document.createElement("select");
                    break;
                case "checkbox":
                    ele = document.createElement("input");
                    ele.setAttribute("type", "checkbox");
                    break;
                case "radiobutton":
                    ele = document.createElement("input");
                    ele.setAttribute("type", "radio");
                    break;
                default:
                    // signature need to be implemented
                    ele = document.createElement("div");
            }
            ele.setAttribute("data-field-name", cName);
            ele.style.position = "absolute";
            ele.style.left = oCoords[0];
            ele.style.top = oCoords[1];
            pages[nPage].appendChild(ele);
            return new Field(ele);
        }
    });
    Object.defineProperty(Doc.prototype, "addIcon", {
        value: function (cName, icon) {
            this.icons.push(icon);
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "addLink", {
        value: function (nPage, oCoords) {
            var pages = document.getElementsByClassName('pageArea');
            var a = document.createElement("a");
            a.style.position = "absolute";
            a.style.left = oCoords[0];
            a.style.top = oCoords[1];
            pages[nPage].appendChild(a);
            return new Link(a);
        }
    });
    Object.defineProperty(Doc.prototype, "addRecipientListCryptFilter", {
        value: function (oCryptFilter, oGroup) {
            console.log("addRecipientListCryptFilter method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "addRequirement", {
        value: function (cType, oReq) {
            console.log("addRequirement method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "addScript", {
        value: function (cName, cScript) {
            console.log("addScript method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "addThumbnails", {
        value: function (nStart, nEnd) {
            console.log("addThumbnails method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "addWatermarkFromFile", {
        value: function (ocg) {
            console.log("addWatermarkFromFile method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "addWatermarkFromText", {
        value: function (ocg) {
            console.log("addWatermarkFromText method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "addWeblinks", {
        value: function (nStart, nEnd) {
            console.log("addWeblinks method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "bringToFront", {
        value: function () {
            console.log("bringToFront method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "calculateNow", {
        value: function () {
            for (var name in AVAILCALCULATES) {
                var scr = AVAILCALCULATES[name];
                var target = document.getElementById(name);
                if (target) {
                    event.htmlTarget = target;
                    var res = eval(scr);
                    if (res != null) {
                        target.value = res;
                    }
                }
            }
            return 1;
        }
    });
    Object.defineProperty(Doc.prototype, "closeDoc", {
        value: function (bNoSave) {
            window.close();
        }
    });
    Object.defineProperty(Doc.prototype, "colorConvertPage", {
        value: function (pageNum, actions, inkActions) {
            console.log("colorConvertPage method not defined contact - IDR SOLUTIONS");
            return true;
        }
    });
    Object.defineProperty(Doc.prototype, "createDataObject", {
        value: function (cName, cValue, cMIMEType, cCryptFilter) {
            console.log("createDataObject method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "createTemplate", {
        value: function (cName, nPage) {
            console.log("createTemplate method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "deletePages", {
        value: function (nStart, nEnd) {
            console.log("deletePages method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "embedDocAsDataObject", {
        value: function (cName, cDoc, cCryptFilter, bUI) {
            console.log("embedDocAsDataObject method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "embedOutputIntent", {
        value: function (outputIntentColorspace) {
            console.log("embedOutputIntent method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "encryptForRecipients", {
        value: function (oGroups, bMetaData, bUI) {
            console.log("encryptForRecipients method not defined contact - IDR SOLUTIONS");
            return false;
        }
    });
    Object.defineProperty(Doc.prototype, "encryptUsingPolicy", {
        value: function (oPolicy, oGroups, oHandler, bUI) {
            console.log("encryptUsingPolicy method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "exportAsFDF", {
        value: function () {
            console.log("exportAsFDF method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "exportAsText", {
        value: function () {
            console.log("exportAsFDF method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "exportAsXFDF", {
        value: function () {
            console.log("exportAsXFDF method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "exportAsXFDFStr", {
        value: function () {
            console.log("exportAsXFDF method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "exportDataObject", {
        value: function () {
            console.log("exportDataObject method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "exportXFAData", {
        value: function () {
            console.log("exportXFAData method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "extractPages", {
        value: function (nStart, nEnd, cPath) {
            console.log("extractPages method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "flattenPages", {
        value: function (nStart, nEnd, nNonPrint) {
            console.log("flattenPages method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "getAnnot", {
        value: function (pageNo, cName) {
            console.log("getAnnot method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "getAnnot3D", {
        value: function (pageNo, cName) {
            console.log("getAnnot3D method not defined contact - IDR SOLUTIONS");
            return null;
        }
    });
    Object.defineProperty(Doc.prototype, "getAnnots", {
        value: function (pageNo, nSortBy, nFilterBy) {
            console.log("getAnnots method not defined contact - IDR SOLUTIONS");
            return [];
        }
    });
    Object.defineProperty(Doc.prototype, "getAnnots3D", {
        value: function (pageNo, nSortBy, nFilterBy) {
            console.log("getAnnots3D method not defined contact - IDR SOLUTIONS");
            return [];
        }
    });
    Object.defineProperty(Doc.prototype, "getColorConvertAction", {
        value: function () {
            console.log("getColorConvertAction method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getDataObject", {
        value: function (cName) {
            console.log("getDataObject method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getDataObjectContents", {
        value: function (cName, bAllowAuth) {
            console.log("getDataObjectContents method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getField", {
        value: function (cName) {
            var elems = document.querySelectorAll('[data-field-name="' + cName + '"]');
            var ele = elems[0];
            if (elems.length > 1 && ele.getAttribute("type") == "radio") {
                for (var i = 0, ii = elems.length; i < ii; i++) {
                    if (elems[i].checked) {
                        return new Field(elems[i]);
                    }
                }
            }
            return new Field(ele);
        }
    });
    Object.defineProperty(Doc.prototype, "getIcon", {
        value: function (cName) {
            for (var i = 0, ii = this.icons.length; i < ii; i++) {
                if (this.icons[i].name === cName) {
                    return this.icons[i];
                }
            }
            return new Icon();
        }
    });
    Object.defineProperty(Doc.prototype, "getLegalWarnings", {
        value: function (bExecute) {
            console.log("getLegalWarnings method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getLinks", {
        value: function (nPage, oCoords) {
            console.log("getLinks method not defined contact - IDR SOLUTIONS");
            return [];
        }
    });
    Object.defineProperty(Doc.prototype, "getNthFieldName", {
        value: function (nIndex) {
            var nodeList = document.querySelectorAll("[data-field-name]");
            var res = nodeList[nIndex];
            if (res) {
                return res.getAttribute("data-field-name");
            }
            return "";
        }
    });
    Object.defineProperty(Doc.prototype, "getNthTemplate", {
        value: function (nIndex) {
            console.log("getNthTemplate method not defined contact - IDR SOLUTIONS");
            return "";
        }
    });
    Object.defineProperty(Doc.prototype, "getOCGs", {
        value: function (nPage) {
            console.log("getOCGs method not defined contact - IDR SOLUTIONS");
            return [];
        }
    });
    Object.defineProperty(Doc.prototype, "getOCGOrder", {
        value: function () {
            console.log("getOCGOrder method not defined contact - IDR SOLUTIONS");
            return [];
        }
    });
    Object.defineProperty(Doc.prototype, "getPageBox", {
        value: function (cBox, nPage) {
            console.log("getPageBox method not defined contact - IDR SOLUTIONS");
            return [];
        }
    });
    Object.defineProperty(Doc.prototype, "getPageLabel", {
        value: function (nPage) {
            console.log("getPageLabel method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getPageNthWord", {
        value: function (nPage, nWord, bStrip) {
            console.log("getPageNthWord method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getPageNthWordQuads", {
        value: function (nPage, nWord) {
            console.log("getPageNthWordQuards method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getPageNumWords", {
        value: function (nPage) {
            console.log("getPageNumWords method not defined contact - IDR SOLUTIONS");
            return 0;
        }
    });
    Object.defineProperty(Doc.prototype, "getPageRotation", {
        value: function (nPage) {
            console.log("getPageRotation method not defined contact - IDR SOLUTIONS");
            return 0;
        }
    });
    Object.defineProperty(Doc.prototype, "getPageTransition", {
        value: function (nPage) {
            console.log("getPageTransition method not defined contact - IDR SOLUTIONS");
            return [];
        }
    });
    Object.defineProperty(Doc.prototype, "getPrintParams", {
        value: function () {
            console.log("getPrintParams method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getSound", {
        value: function (cName) {
            console.log("getSound method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getTemplate", {
        value: function (cName) {
            console.log("getTemplate method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });
    Object.defineProperty(Doc.prototype, "getURL", {
        value: function (cURL, bAppend) {
            console.log("getURL method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "gotoNamedDest", {
        value: function (cName) {
            console.log("gotoNamedDest method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "importAnFDF", {
        value: function (cPath) {
            console.log("importAnFDF method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "importDataObject", {
        value: function (cDIPath, cCryptFilter) {
            console.log("importDataObject method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "importIcon", {
        value: function (cDIPath, nPage) {
            console.log("importIcon method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "importSound", {
        value: function (cDIPath) {
            console.log("importSound method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "importTextData", {
        value: function (cPath, nRow) {
            console.log("importTextData method not defined contact - IDR SOLUTIONS");
            return 0;
        }
    });
    Object.defineProperty(Doc.prototype, "importXFAData", {
        value: function (cPath) {
            console.log("importXFAData method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "insertPages", {
        value: function (nPath, cPath, nStart, nEnd) {
            console.log("insertPages method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "mailDoc", {
        value: function () {
            //parse true or obj = bUI, cTo, cCc, cBcc, cSubject, cMsg
            console.log("mailDoc method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "mailForm", {
        value: function () {
            //parse true or obj = bUI, cTo, cCc, cBcc, cSubject, cMsg
            console.log("mailForm method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "movePage", {
        value: function (nPage, nAfter) {
            console.log("movePage method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "newPage", {
        value: function (nPage, nWidth, nHeight) {
            console.log("newPage method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Event.prototype, "numFields", {
        get: function () {
            var nodeList = document.querySelectorAll("[data-field-name]");
            return nodeList.length;
        }
    });
    Object.defineProperty(Doc.prototype, "openDataObject", {
        value: function (cName) {
            console.log("openDataObject method not defined contact - IDR SOLUTIONS");
            return this;
        }
    });
    Object.defineProperty(Doc.prototype, "print", {
        value: function () {
            window.print();
        }
    });
    Object.defineProperty(Doc.prototype, "removeDataObject", {
        value: function (cName) {
            console.log("removeDataObject method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "removeField", {
        value: function (cName) {
            var ele = document.querySelector('[data-field-name="' + cName + '"]');
            ele.remove();
        }
    });
    Object.defineProperty(Doc.prototype, "removeIcon", {
        value: function (cName) {
            console.log("removeIcon method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "removeLinks", {
        value: function (nPage, oCoords) {
            console.log("removeLinks method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "removeRequirement", {
        value: function (cType) {
            console.log("removeRequirement method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "removeScript", {
        value: function (cName) {
            console.log("removeScript method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "removeTemplate", {
        value: function (cName) {
            console.log("removeTemplate method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "removeThumbnails", {
        value: function (nStart, nEnd) {
            console.log("removeThumbnails method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "removeWeblinks", {
        value: function (nStart, nEnd) {
            console.log("removeWeblinks method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "replacePages", {
        value: function (nPage, cPath, nStart, nEnd) {
            console.log("replacePages method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "resetForm", {
        value: function (aFields) {
            if (aFields) {

            } else {
                var form = document.getElementsByTagName("form")[0];
                var elements = form.elements;

                // Reset display values 
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].dataset && elements[i].dataset.fieldName && elements[i].dataset.defaultDisplay) {
                        var field = idrform.doc.getField(elements[i].dataset.fieldName);
                        field.display = Number(elements[i].dataset.defaultDisplay);
                    };
                }
                form.reset();
            }
        }
    });

    Object.defineProperty(Doc.prototype, "saveAs", {
        value: function (cPath, cConvID, cFS, bCopy, bPrompToOverwrite) {
//cConvID Valid extensions
//com.adobe.Acrobat.eps eps
//com.adobe.Acrobat.html-3-20 html, htm
//com.adobe.Acrobat.html-4-01-css-1-00 html, htm
//com.adobe.Acrobat.jpeg jpeg ,jpg, jpe
//com.adobe.Acrobat.jp2k jpf,jpx,jp2,j2k,j2c,jpc
//com.adobe.Acrobat.doc doc
//com.callas.preflight.pdfa pdf
//com.callas.preflight.pdfx pdf
//com.adobe.Acrobat.png png
//com.adobe.Acrobat.ps ps
//com.adobe.Acrobat.rtf rft
//com.adobe.Acrobat.accesstext txt
//com.adobe.Acrobat.plain-text txt
//com.adobe.Acrobat.tiff tiff, tif
//com.adobe.Acrobat.xml-1-00 xml
            var hasRequired = this._checkRequired();
            if (hasRequired) {
                window.alert("At least one required field was empty on export. Please fill in required fields (highlighted) before continuing");
                return;
            }
            console.log("saveAs method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "scroll", {
        value: function (nx, ny) {
            console.log("scroll method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "selectPageNthWord", {
        value: function (nPage, nWord, bScroll) {
            console.log("selectPageNthWord method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "setAction", {
        value: function (cTrigger, cScript) {
            console.log("setAction method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "setDataObjectContents", {
        value: function (cName, oStream, cCryptFilter) {
            console.log("setDataObjectContents method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "setOCGOrder", {
        value: function (cOrderArray) {
            console.log("setOCGOrder method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "setPageAction", {
        value: function (cTrigger, cScript) {
            console.log("setPageAction method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "setPageBoxes", {
        value: function (cBox, nStart, nEnd, rBox) {
            console.log("setPageBoxes method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "setPageLabels", {
        value: function (nPage, aLabel) {
            console.log("setPageLabels method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "setPageTabOrder", {
        value: function (nPage, cOrder) {
            console.log("setPageTabOrder method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "setPageTransitions", {
        value: function (nStart, nEnd, aTrans) {
            console.log("setPageTransitions method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "spawnPageFromTemplate", {
        value: function (cTemplate, nPage, bRename, bOverlay, oXObject) {
            console.log("spawnPageFromTemplate method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Doc.prototype, "_getFieldsHTML", {
        value: function (types) {
            var result = new Array();
            for (var i = 0, ii = types.length; i < ii; i++) {
                var temp = document.getElementsByTagName(types[i]);
                for (var j = 0, jj = temp.length; j < jj; j++) {
                    result.push(temp[j]);
                }
            }
            return result;
        }
    });
    Object.defineProperty(Doc.prototype, "_checkRequired", {
        value: function () {
            var hasRequired = false;
            var inp = this._getFieldsHTML(["input", "textarea", "select"]);
            for (var i = 0, ii = inp.length; i < ii; i++) {
                var elem = inp[i];
                if (elem.hasAttribute("required")) {
                    if (elem.value === null || elem.value === "") {
                        elem.style.border = "1px solid red";
                        hasRequired = true;
                    }
                }
            }
            return hasRequired;
        }
    });
    Object.defineProperty(Doc.prototype, "_submitFormAsXML", {
        value: function (cURL) {
            var hasRequired = this._checkRequired();
            if (hasRequired) {
                window.alert("At least one required field was empty on export. Please fill in required fields (highlighted) before continuing");
                return;
            }
            var xmlStr = "<?xml version='1.0' encoding='UTF-8'?><fields>";
            var inp = this._getFieldsHTML(["input", "textarea", "select"]);
            var dataName, elem;
            for (var i = 0, ii = inp.length; i < ii; i++) {
                elem = inp[i];
                dataName = elem.getAttribute("data-field-name");
                if (dataName) {
                    switch (elem.type) {
                        case "radio":
                        case "checkbox":
                            if (elem.checked && elem.value != null) {
                                xmlStr += "<" + dataName + ">" + elem.value + "</" + dataName + ">";
                            }
                            break;
                        default:
                            if (elem.value != null) {
                                xmlStr += "<" + dataName + ">" + elem.value + "</" + dataName + ">";
                            }
                            break;
                    }
                }
            }
            xmlStr += "</fields>";

            var form = document.createElement("form");
            form.setAttribute("method", "post");
            document.body.appendChild(form);
            form.setAttribute("action", url);

            var textArea = document.createElement("textarea");
            textArea.setAttribute("name", "xmldata");
            textArea.value = btoa(xmlStr);
            form.appendChild(textArea);
            form.submit();
        }
    });
    Object.defineProperty(Doc.prototype, "_submitFormAsJSON", {
        value: function (cURL) {
            var hasRequired = this._checkRequired();
            if (hasRequired) {
                window.alert("At least one required field was empty on export. Please fill in required fields (highlighted) before continuing");
                return;
            }
            var jsonStr = "{\"fields\":[\n";
            var inp = this._getFieldsHTML(["input", "textarea", "select"]);
            var dataName, elem;
            for (var i = 0, ii = inp.length; i < ii; i++) {
                elem = inp[i];
                dataName = elem.getAttribute("data-field-name");
                if (dataName) {
                    switch (elem.type) {
                        case "radio":
                        case "checkbox":
                            if (elem.checked && elem.value != null) {
                                jsonStr += "\"" + dataName + "\":\"" + elem.value + "\",\n";
                            }
                            break;
                        default:
                            if (elem.value != null) {
                                jsonStr += "\"" + dataName + "\":\"" + elem.value + "\",\n";
                            }
                            break;
                    }
                }
            }
            jsonStr += "]}";

            var form = document.createElement("form");
            form.setAttribute("method", "post");
            document.body.appendChild(form);
            form.setAttribute("action", url);

            var textArea = document.createElement("textarea");
            textArea.setAttribute("name", "jsondata");
            textArea.value = btoa(jsonStr);
            form.appendChild(textArea);
            form.submit();
            // submit as json goes here;
        }
    });
    Object.defineProperty(Doc.prototype, "_submitFormAsPDF", {
        value: function (url) {
            var hasRequired = this._checkRequired();
            if (hasRequired) {
                window.alert("At least one required field was empty on export. Please fill in required fields (highlighted) before continuing");
                return;
            }
            var dd = document.getElementById("FDFXFA_Processing");
            if (dd) {
                dd.style.display = "block";
            }
            var dataArr = EcmaParser._insertFieldsToPDF("");
            var str64 = EcmaFilter.encodeBase64(dataArr);
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            if (url) {
                form.setAttribute("action", url);
            } else {
                url = window.prompt("Please Enter URL to Submit Form; \n[ Please use 'pdfdata' as named parameter for accessing filled pdf as base64 ] \n[ Please refer to FormVu documentation for defining submit URL ]");
                form.setAttribute("action", url);
            }
            document.body.appendChild(form);
            var textArea = document.createElement("textarea");
            textArea.setAttribute("name", "pdfdata");
            textArea.value = str64;
            form.appendChild(textArea);
            form.submit();
            if (dd) {
                dd.style.display = "none";
            }
        }
    });
    Object.defineProperty(Doc.prototype, "submitForm", {
        value: function (url, bFDF, bEmpty, aFields, bGet, bAnnotations, bXML) {
            if (app.isAcroForm) {
                this._submitFormAsPDF(url);
            } else {
                var pdfDoc = new PdfDocument();
                var page = new PdfPage();
                pdfDoc.addPage(page);
                var text = new PdfText(70, 70, "Helvetica", 20, "Please wait...");
                page.addText(text);
                text = new PdfText(70, 110, "Helvetica", 11, "If this message is not eventually replaced by proper contents of the document, your PDF");
                page.addText(text);
                text = new PdfText(70, 124, "Helvetica", 11, "viewer may not be able to display this type of document.");
                page.addText(text);
                text = new PdfText(70, 150, "Helvetica", 11, "You can upgrade to the latest version of Adobe Reader for Windows, Mac, or Linux by");
                page.addText(text);
                text = new PdfText(70, 164, "Helvetica", 11, "visiting http://www.adobe.com/go/reader_download.");
                page.addText(text);
                text = new PdfText(70, 190, "Helvetica", 11, "For more assistance with Adobe Reader visit http://www.adobe.com/go/acrreader.");
                page.addText(text);
                text = new PdfText(70, 220, "Helvetica", 7.5, "Windows is either a registered trademark or a trademark of Microsoft Corporation in the United States and/or other countries. Mac is a trademark ");
                page.addText(text);
                text = new PdfText(70, 229, "Helvetica", 7.5, "of Apple Inc., registered in the United States and other countries. Linux is the registered trademark of Linus Torvalds in the U.S. and other ");
                page.addText(text);
                text = new PdfText(70, 238, "Helvetica", 7.5, "countries.");
                page.addText(text);

//    console.log(EcmaPDF.decode64(templateStr));
                var xdpStr = generateXDP();
                var str = pdfDoc.createPdfString(xdpStr);
                var str64 = EcmaPDF.encode64(str);
                var form = document.createElement("form");
                form.setAttribute("method", "post");
                if (url) {
                    form.setAttribute("action", url);
                } else {
                    url = window.prompt("Please Enter URL to Submit Form; \n[ Please use 'pdfdata' as named parameter for accessing filled pdf as base64 ] \n[ Please refer to FormVu documentation for defining submit URL ]");
                    form.setAttribute("action", url);
                }
                document.body.appendChild(form);
                var textArea = document.createElement("textarea");
                textArea.setAttribute("name", "pdfdata");
                textArea.value = str64;
                form.appendChild(textArea);
                form.submit();
            }
        }
    });
    Object.defineProperty(Doc.prototype, "syncAnnotScan", {
        value: function () {
            console.log("syncAnnotScan method not defined contact - IDR SOLUTIONS");
        }
    });

    function Event() {
        this.htmlEvent = null;
        this.htmlTarget = null;
        this.changeEx = null;
        this.commitKey = null;
        this.fieldFull = null;
        this.keyDown = null;
        this.modifier = null;
//        Keystroke Mouse Exit
//        Validate WillPrint
//        Focus DidPrint
//        Blur WillSave
//        Format DidSave
//        Calculate Init
//        Mouse Up Exec
//        Mouse Down Open
//        Mouse Enter Close
        this.name = "";
        this.rc = null;
        this.richChange = null;
        this.richChangeEx = null;
        this.richValue = null;
        this.selEnd = null;
        this.selStart = null;
        this.targetName = "";
        this.type = "Field";
        this.willCommit = null;
    }
    Object.defineProperty(Event.prototype, "shift", {
        get: function () {
            return this.htmlEvent.shiftKey;
        }
    });
    Object.defineProperty(Event.prototype, "source", {
        get: function () {
            var e = this.htmlEvent.target || this.htmlEvent.srcElement;
            return new Field(e);
        }
    });
    Object.defineProperty(Event.prototype, "target", {
        get: function () {
            var e = this.htmlEvent.target || this.htmlEvent.srcElement;
            return new Field(e);
        }
    });
    Object.defineProperty(Event.prototype, "value", {
        get: function () {
            if (this.htmlTarget) {
                return this.htmlTarget.value;
            }
            var e = this.htmlEvent.target || this.htmlEvent.srcElement;
            return e.value;
        }, set: function (v) {
            if (this.htmlTarget) {
                this.htmlTarget.value = v;
                return;
            }
            var e = this.htmlEvent.target || this.htmlEvent.srcElement;
            e.value = v;
        }
    });
    Object.defineProperty(Event.prototype, "change", {
        get: function () {
            var e = this.htmlEvent.target || this.htmlEvent.srcElement;
            return e.value;
        }, set: function (v) {
            var e = this.htmlEvent.target || this.htmlEvent.srcElement;
            e.value = v;
        }
    });

    function Events() {
        this.add = function () {
            console.log("add method not defined contact - IDR SOLUTIONS");
        };
        this.dispatch = function () {
            console.log("dispatch method not defined contact - IDR SOLUTIONS");
        };
        this.remove = function () {
            console.log("remove method not defined contact - IDR SOLUTIONS");
        };
    }

    function EventListener() {
        this.afterBlur = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterClose = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterDestroy = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterDone = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterError = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterEscape = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterEveryEvent = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterFocus = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterPause = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterPlay = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterReady = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterScript = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterSeek = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterStatus = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.afterStop = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onBlur = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onClose = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onDestroy = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onDone = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onError = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onEscape = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onEveryEvent = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onFocus = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onGetRect = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onPause = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onPlay = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onReady = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onScript = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onSeek = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onStatus = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
        this.onStrop = function (oMediaEvent) {
            console.log("method not defined contact - IDR SOLUTIONS");
        };
    }

    function hexToRgbCss(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    function rgbToHexCss(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function rgbCssToArr(rgb) {
        return rgb.replace(/[^\d,]/g, '').split(',');
    }

    var color = {
        transparent: ["T"], black: ["G", 0], white: ["G", 1], red: ["RGB", 1, 0, 0],
        green: ["RGB", 0, 1, 0], blue: ["RGB", 0, 0, 1], cyan: ["CMYK", 1, 0, 0, 0],
        magenta: ["CMYK", 0, 1, 0, 0], yellow: ["CMYK", 0, 0, 1, 0], dkGray: ["G", 0.25],
        gray: ["G", 0.5], ltGray: ["G", 0.75],
        convert: function (oColor, oColorSpace) {
            var oOut = oColor;
            switch (oColorSpace) {
                case "G":
                    if (oColor[0] === "RGB")
                        oOut = new Array("G", 0.3 * oColor[1] + 0.59 * oColor[2] + 0.11 * oColor[3]);
                    else if (oColor[0] === "CMYK")
                        oOut = new Array("G", 1.0 - Math.min(1.0,
                                0.3 * oColor[1] + 0.59 * oColor[2] + 0.11 * oColor[3] + oColor[4]));
                    break;
                case "RGB":
                    if (oColor[0] === "G")
                        oOut = new Array("RGB", oColor[1], oColor[1], oColor[1]);
                    else if (oColor[0] === "CMYK")
                        oOut = new Array("RGB", 1.0 - Math.min(1.0, oColor[1] + oColor[4]),
                                1.0 - Math.min(1.0, oColor[2] + oColor[4]),
                                1.0 - Math.min(1.0, oColor[3] + oColor[4]));
                    break;
                case "CMYK":
                    if (oColor[0] === "G")
                        oOut = new Array("CMYK", 0, 0, 0, 1.0 - oColor[1]);
                    else if (oColor[0] === "RGB")
                        oOut = new Array("CMYK", 1.0 - oColor[1], 1.0 - oColor[2], 1.0 - oColor[3], 0);
                    break;
            }
            return oOut;
        },
        equal: function (c1, c2) {
            if (c1[0] === "G") {
                c1 = this.convert(c1, c2[0]);
            } else {
                c2 = this.convert(c2, c1[0]);
            }
            if (c1[0] !== c2[0]) {
                return false;
            }
            var nComponents = c1[0].length;
            for (var i = 1; i <= nComponents; i++) {
                if (c1[i] !== c2[i]) {
                    return false;
                }
            }
            return true;
        },
        htmlColorToPDF: function (col) {
            if (col.hasOwnProperty("indexof") && col.indexof("#") !== -1) {
                col = hexToRgbCss(col);
            }
            var res = rgbCssToArr(col);
            return ["RGB", res[0] / 255, res[1] / 255, res[2] / 255];
        },
        pdfColorToHTML: function (v) {
            var col = color.convert(v, "RGB");
            return rgbToHexCss(parseInt(col[1] * 255), parseInt(col[2] * 255), parseInt(col[3] * 255));
        }
    };

    function Field(ele) {
        this.input = ele;
        this.buttonAlignX = 0;
        this.buttonAlignY = 0;
        this.buttonFitBounds = false;
        this.buttonPosition = 0;
        this.buttonScaleHoq = 0;
        this.buttonScaleWhen = 0;
        this.calcOrderIndex = 0;
        this.comb = false;
        this.commitOnSelChange = true;
        this.currentValueIndices = [];
        this.defaultStyle = {};
        this.defaultValue = "";
        this.doNotScroll = false;
        this.doNotSpellCheck = false;
        this.delay = false;
        this.doc = doc;
        this.exportValues = [];
        this.fileSelect = false;
        this.highlight = "none";
        this.multiline = false;
        this.multipleSelection = false;
        this.page = 0;
        this.password = false;
        this.print = true;
        this.radiosInUnison = false;
        this.rect = [];
        this.richText = false;
        this.richValue = [];
        this.rotation = 0;
        this.style = "";
        this.submitName = "";
        this.textFont = null;
        this.userName = "";
    }
    Object.defineProperty(Field.prototype, "alignment", {
        get: function () {
            return (this.input.style.textAlign) ? this.input.style.textAlign : "left";
        }, set: function (v) {
            this.input.style.textAlign = v;
        }
    });
    Object.defineProperty(Field.prototype, "borderStyle", {
        get: function () {
            switch (this.input.style.borderStyle) {
                case "solid":
                    return border.s;
                case "dashed":
                    return border.d;
                case "beveled":
                    return border.b;
                case "inset":
                    return border.i;
                case "underline":
                    return border.u;
            }
            return "none";
        }, set: function (v) {
            this.input.style.borderStyle = v;
        }
    });
    Object.defineProperty(Field.prototype, "charLimit", {
        get: function () {
            return this.input.maxLength;
        }, set: function (v) {
            this.input.maxLength = v;
        }
    });
    Object.defineProperty(Field.prototype, "display", {
        get: function () {
            if (this.input && (this.input.style.display === "none" || this.input.classList.contains("idr-hidden"))) {
                return display.hidden;
            }
            return display.visible;
        }, set: function (v) {
            if (this.input) {
                this.input.dataset.defaultDisplay = this.input.dataset.defaultDisplay ?? this.display;
            }

            switch (v) {
                case display.visible:
                    this.input.style.display = "initial";
                    break;
                case display.hidden:
                    this.input.style.display = "none";
                    break;
                case display.noView:
                    this.input.style.display = "none";
                    break;
            }
        }
    });
    Object.defineProperty(Field.prototype, "editable", {
        get: function () {
            return this.input.disabled;
        }, set: function (v) {
            this.input.style.disabled = v;
        }
    });
    Object.defineProperty(Field.prototype, "fillColor", {
        get: function () {
            if (!this.input) {
                return "";
            }
            var style = window.getComputedStyle(this.input);
            return color.htmlColorToPDF(style.backgroundColor);
        }, set: function (v) {
            this.input.style.backgroundColor = color.pdfColorToHTML(v);
        }
    });
    Object.defineProperty(Field.prototype, "hidden", {
        get: function () {
            return this.input.hidden;
        }, set: function (v) {
            this.input.hidden = v;
        }
    });
    Object.defineProperty(Field.prototype, "lineWidth", {
        get: function () {
            return parseInt(this.style.borderWidth);
        }, set: function (v) {
            this.input.style.borderWidth = v + "px";
        }
    });
    Object.defineProperty(Field.prototype, "name", {
        get: function () {
            return this.input.getAttribute("data-field-name");
        }, set: function (v) {
            this.input.setAttribute("data-field-name", v);
        }
    });
    Object.defineProperty(Field.prototype, "numItems", {
        get: function () {
            return this.input.options.length;
        }
    });
    Object.defineProperty(Field.prototype, "readOnly", {
        get: function () {
            return this.input.readOnly;
        }, set: function (v) {
            this.input.readOnly = v;
        }
    });
    Object.defineProperty(Field.prototype, "required", {
        get: function () {
            return this.input.required;
        }, set: function (v) {
            this.input.required = v;
        }
    });
    Object.defineProperty(Field.prototype, "textSize", {
        get: function () {
            return parseInt(this.input.style.fontSize);
        }, set: function (v) {
            this.input.style.fontSize = parseInt(v) + "px";
        }
    });
    Object.defineProperty(Field.prototype, "strokeColor", {
        get: function () {
            return color.htmlColorToPDF(this.input.style.borderColor);
        }, set: function (v) {
            this.input.style.borderColor = color.pdfColorToHTML(v);
        }
    });
    Object.defineProperty(Field.prototype, "textColor", {
        get: function () {
            return color.htmlColorToPDF(this.input.style.color);
        }, set: function (v) {
            this.input.style.color = color.pdfColorToHTML(v);
        }
    });
    Object.defineProperty(Field.prototype, "type", {
        get: function () {
            var tagName = this.input.tagName;
            if (tagName === "INPUT") {
                return this.getAttribute("type");
            } else if (tagName === "SELECT") {
                return "listbox";
            } else if (tagName === "BUTTON") {
                return "button";
            }
            return "text";
            // do later signature and combobox
        }
    });
    Object.defineProperty(Field.prototype, "value", {
        get: function () {
            if (!this.input) {
                return undefined;
            }

            var val = this.input.value;
            var type = this.input.getAttribute("type");
            switch (type) {
                case "checkbox":
                    if (!this.input.checked) {
                        return false;
                    }
                    break;
                case "radio":
                    if (val != null) {
                        return EcmaFormField.hexDecodeName(val);
                    }
                    break;
                case "text":
                    if (val === '') {
                        return val;
                    }
                    break;
            }
            if (isNaN(val)) {
                return val;
            }
            return val * 1;
        }, set: function (v) {
            if (this.input.getAttribute("type") == "radio") {
                this.input.value = EcmaFormField.hexEncodeName(v);
            } else {
                this.input.value = v;
            }
        }
    });
    Object.defineProperty(Field.prototype, "valueAsString", {
        get: function () {
            return "" + this.input.value;
        }, set: function (v) {
            this.input.value = "" + v;
        }
    });
    Object.defineProperty(Field.prototype, "browseForFileToSubmit", {
        value: function () {
            console.log("browseForFileToSubmit is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "buttonGetCaption", {
        value: function () {
            return this.input.innerHTML;
        }
    });
    Object.defineProperty(Field.prototype, "buttonGetIcon", {
        value: function () {
            console.log("buttonGetIcon is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "buttonImportIcon", {
        value: function () {
            console.log("buttonImportIcon is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "buttonSetCaption", {
        value: function (val) {
            this.input.innerHTML = val;
        }
    });
    Object.defineProperty(Field.prototype, "buttonSetIcon", {
        value: function () {
            console.log("buttonSetIcon is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "checkThisBox", {
        value: function (nWidget, bCheckIt) {
            this.input.checked = true; // do later
        }
    });
    Object.defineProperty(Field.prototype, "clearItems", {
        value: function () {
            var i, ii = this.input.options.length - 1;
            for (i = ii; i >= 0; i--) {
                this.input.remove(i);
            }
        }
    });
    Object.defineProperty(Field.prototype, "defaultsChecked", {
        value: function () {
            return this.input.checked;
        }
    });
    Object.defineProperty(Field.prototype, "deleteItemAt", {
        value: function (nIdx) {
            if (nIdx === -1) {
                var i = this.input.options.length - 1;
                this.input.remove(i);
            } else {
                this.input.remove(nIdx);
            }
        }
    });
    Object.defineProperty(Field.prototype, "getArray", {
        value: function () {
            console.log("getArray is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "getItemAt", {
        value: function (nIdx, bExportValue) {
            return this.input.options[nIdx];
        }
    });
    Object.defineProperty(Field.prototype, "getLock", {
        value: function () {
            console.log("getLock is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "insertItemAt", {
        value: function (cName, cExport, nIdx) {
            var option = document.createElement("option");
            option.text = cName;
            this.input.add(option, nIdx);
        }
    });
    Object.defineProperty(Field.prototype, "isBoxChecked", {
        value: function (nWidget) {
            return this.input.checked; // do later
        }
    });
    Object.defineProperty(Field.prototype, "isDefaultChecked", {
        value: function (nWidget) {
            console.log("isDefaultChecked is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "setAction", {
        value: function (cTrigger, cScript) {
            switch (cTrigger) { // do later
                case "MouseUp":
                    this.input.addEventListener("mouseup", new Function(cScript));
                    break;
                case "MouseDown":
                    this.input.addEventListener("mousedown", new Function(cScript));
                    break;
                case "MouseEnter":
                    this.input.addEventListener("mouseenter", new Function(cScript));
                    break;
                case "MouseExit":
                    this.input.addEventListener("mouseexit", new Function(cScript));
                    break;
                case "OnFocus":
                    this.input.addEventListener("focus", new Function(cScript));
                    break;
                case "OnBlur":
                    this.input.addEventListener("blur", new Function(cScript));
                    break;
                case "Keystroke":
                    this.input.addEventListener("keydown", new Function(cScript));
                    break;
                case "Validate":
                    break;
                case "Calculate":
                    break;
                case "Format":
                    break;
            }
        }
    });
    Object.defineProperty(Field.prototype, "setFocus", {
        value: function () {
            this.input.focus();
        }
    });
    Object.defineProperty(Field.prototype, "setItems", {
        value: function (oArray) {
            for (var i = 0; i < oArray.length; i++) {
                var option = document.createElement("option");
                option.text = oArray[i];
                this.input.add(option);
            }
        }
    });
    Object.defineProperty(Field.prototype, "setLock", {
        value: function (cLock) {
            console.log("setLock is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "signatureGetModifications", {
        value: function () {
            console.log("signatureGetModifications is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "signatureGetSeedValue", {
        value: function () {
            console.log("signatureGetSeedValue is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "signatureInfo", {
        value: function () {
            console.log("signatureInfo is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "signauteSetSeedValue", {
        value: function () {
            console.log("signauteSetSeedValue is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "signatureSign", {
        value: function () {
            console.log("signatureSign is method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(Field.prototype, "signatureValidate", {
        value: function () {
            console.log("signatureValidate is method not defined contact - IDR SOLUTIONS");
        }
    });

    function FDF() {
        this.deleteOption = 0;
        this.isSigned = false;
        this.numEmbeddedFiles = 0;
    }
    Object.defineProperty(FDF.prototype, "addContact", {
        value: function (oUserEntity) {
            console.log("addContact method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(FDF.prototype, "addEmbeddedFile", {
        value: function (cDIPath, nSaveOption) {
            console.log("addEmbeddedFile method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(FDF.prototype, "addRequest", {
        value: function (cType, cReturnAddress, cName) {
            console.log("addRequest method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(FDF.prototype, "close", {
        value: function () {
            console.log("close method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(FDF.prototype, "mail", {
        value: function () {
            console.log("mail method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(FDF.prototype, "save", {
        value: function () {
            console.log("save method not defined contact - IDR SOLUTIONS");
        }
    });
    Object.defineProperty(FDF.prototype, "signatureClear", {
        value: function () {
            console.log("signatureClear method not defined contact - IDR SOLUTIONS");
            return false;
        }
    });
    Object.defineProperty(FDF.prototype, "signatureSign", {
        value: function () {
            console.log("signatureSign method not defined contact - IDR SOLUTIONS");
            return false;
        }
    });
    Object.defineProperty(FDF.prototype, "signatureValidate", {
        value: function (oSig, bUI) {
            console.log("signatureSign method not defined contact - IDR SOLUTIONS");
            return {};
        }
    });

    function FullScreen() {

    }

    Object.defineProperty(FullScreen.prototype, "isFullscreen", {
        get: function () {
            return this.isinFullscreen;
        }, set: function (newValue) {
            if (newValue) {
                var requestFullscreen = document.body.requestFullscreen
                        || document.body.msRequestFullscreen
                        || document.body.mozRequestFullScreen
                        || document.body.webkitRequestFullscreen;
                requestFullscreen.call(document.body);
            } else {
                var exitFullscreen = document.exitFullscreen
                        || document.msExitFullscreen
                        || document.mozCancelFullScreen
                        || document.webkitCancelFullScreen;
                exitFullscreen.call(document);
            }
        }, configurable: true, enumerable: true
    });

    Object.defineProperty(FullScreen.prototype, "isFullscreenEnabled", {
        value: function () {
            return document.fullscreenEnabled || document.msFullscreenEnabled
                    || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
        }
    });
    Object.defineProperty(FullScreen.prototype, "isinFullscreen", {
        value: function () {
            return !!(document.fullscreenElement || document.msFullscreenElement
                    || document.mozFullScreenElement || document.webkitFullscreenElement);
        }
    });
    Object.defineProperty(FullScreen.prototype, "toggleFullscreen", {
        value: function () {
            if (!this.isinFullscreen()) {
                var requestFullscreen = document.body.requestFullscreen
                        || document.body.msRequestFullscreen
                        || document.body.mozRequestFullScreen
                        || document.body.webkitRequestFullscreen;
                requestFullscreen.call(document.body);
            } else {
                var exitFullscreen = document.exitFullscreen
                        || document.msExitFullscreen
                        || document.mozCancelFullScreen
                        || document.webkitCancelFullScreen;
                exitFullscreen.call(document);
            }
        }
    });

    var ADBC = {
//sql types
        SQLT_BIGINT: 0, SQLT_BINARY: 1, SQLT_BIT: 2, SQLT_CHAR: 3, SQLT_DATE: 4,
        SQLT_DECIMAL: 5, SQLT_DOUBLE: 6, SQLT_FLOAT: 7, SQLT_INTEGER: 8,
        SQLT_LONGVARBINARY: 9, SQLT_LONGVARCHAR: 10, SQLT_NUMERIC: 11, SQLT_REAL: 12,
        SQLT_SMALLINT: 13, SQLT_TIME: 14, SQLT_TIMESTAMP: 15, SQLT_TINYINT: 16,
        SQLT_VARBINARY: 17, SQLT_VARCHAR: 18, SQLT_NCHAR: 19, SQLT_NVARCHAR: 20,
        SQLT_NTEXT: 21,
//javascript types
        Numeric: 0, String: 1, Binary: 2, Boolean: 3, Time: 4, Date: 5, TimeStamp: 6,
        getDataSourceList: function () {
            console.log("ADBC.getDataSourceList() method not defined contact - IDR SOLUTIONS");
            return new Array();
        },
        newConnnection: function () {
            var obj = {};
            if (arguments[0] instanceof Object) {
                obj = arguments[0];
            } else {
                obj.cDSN = arguments[0];
                switch (arguments.length) {
                    case 2:
                        obj.cUID = arguments[1];
                        break;
                    case 3:
                        obj.cUID = arguments[1];
                        obj.cPWD = arguments[2];
                        break;
                }
            }
            console.log("ADBC.newConnection method not defined contact - IDR SOLUTIONS");
            return null;
        }
    };

    function Alerter() {
        this.dispathc = function () {
            console.log("dispatch method not defined contact - IDR SOLUTIONS");
        };
    }

    function Alert() {
        this.type = "";
        this.doc = null;
        this.fromUser = false;
        this.error = {message: ""};
        this.errorText = "";
        this.fileName = "";
        this.selection = null; //mediaselection object
    }

    function AlternatePresentation() {
        this.active = false;
        this.type = "";
        this.start = function () {
            console.log("start method not defined contact - IDR SOLUTIONS");
        };
        this.stop = function () {
            console.log("stop method not defined contact - IDR SOLUTIONS");
        };
    }

    function Annotation() {
        this.type = "Text"; //required
        this.rect = [];//required
        this.page = 0; //required and pages starting from 0 used by IDR

        this.alignment = 0; //left0, center3, right2
        //Approved,AsIs,Confidential,Departmental,Draft,Experimental,Expired,Final,
        //ForComment,ForPublicRelease,NotApproved,NotForPublicRelease,Sold,TopSecret
        this.AP = "Approved";
        //none,OpenArrow,ClosedArrow,ROpenArrow,RCloseArrow,Butt,Diamond,Circle,Square
        //Slash
        this.arrowBegin = "None";
        this.arrowEnd = "None"; //same as arrowbegin
        this.attachIcon = "PushPin"; //PaperClip,PushPin,Graph,Tag
        this.author = "";
        this.borderEffectIntensity = "";
        this.callout = [];
        this.caretSymbol = ""; //"P" or "S";
        this.contents = "";
        this.creationDate = new Date();
        this.dash = [];
        this.delay = false;
        this.doc = null; //doc object;
        this.doCaption = false;
        this.fillColor = [];// Ex : for gray [0.7] for rgb [0.2,0.7,1.0] for cmyk [1,0,0,0.2];
        this.gestures = [];
        this.hidden = false;
        this.inReplyTo = "";
        this.intent = "";
        this.leaderExtend = 0;
        this.leaderLength = 0;
        this.lineEnding = "none"; //same as arrowbegin
        this.lock = false;
        this.modDate = new Date();
        this.name = "";
        //Check,Circle,Comment,Cross,Help,Insert,Key,NewParagraph,Note,RightArrow,
        //RightPointer,Star,UpArrow,UpLeftArrow
        this.noteIcon = "Note";
        this.noView = false;
        this.opacity = 1.0;
        this.open = false;
        this.point = [];
        this.points = [];
        this.popupOpen = true;
        this.popupRect = [];
        this.print = false;
        this.quads = [];
        this.readOnly = false;
        this.refType = "";
        this.richContents = []; //array of span objects page69
        this.richDefaults = null; //span object;
        this.rotate = 0;
        this.seqNum = 0;
        this.soundIcon = "";
        this.state = "";
        this.stateModel = "";
        this.strokeColor = [];
        this.style = "";
        this.subject = "";
        this.textFont = "";
        this.textSize = 10;
        this.toggleNoView = false;
        this.vertices = null; //array of arrays;
        this.width = 1;
        //below are custom addition for link
        this.URI = "";
        this.GoTo = "";
    }

    Object.defineProperty(Annotation.prototype, "getDictionaryString", {
        value: function () {
            var str = "<</Type /Annot /Subtype /" + this.type + " /Rect [ ";
            for (var i = 0, ii = this.rect.length; i < ii; i++) {
                str += this.rect[i] + " ";
            }
            str += "]";
            if (this.type === AnnotationType.Highlight) {
                str += "/QuadPoints [ ";
                for (var i = 0, ii = this.quads.length; i < ii; i++) {
                    str += (this.quads[i] + " ");
                }
                str += "]";
            } else if (this.type === AnnotationType.Text) {
                if (this.contents.length > 0) {
                    str += "/Contents (" + this.contents + ")";
                }
                if (this.open) {
                    str += "/Open true";
                }
            } else if (this.type === AnnotationType.Link) {
                if (this.URI.length > 0) {
                    str += "/A <</Type /Action /S /URI /URI (" + this.URI + ")>>";
                } else if (this.GoTo.length > 0) {
                    str += "/Dest [" + this.GoTo + " /Fit]>>";
                }
                if (this.quads.length > 0) {
                    str += "/QuadPoints [ ";
                    for (var i = 0, ii = this.quads.length; i < ii; i++) {
                        str += (this.quads[i] + " ");
                    }
                    str += "]";
                }
            } else if (this.type === AnnotationType.Line) { //stroke color is important to view line
                str += ("/L [" + this.points[0] + " " + this.points[1] + " " + this.points[2] + " " + this.points[3] + "]");
            } else if (this.type === AnnotationType.Polygon || this.type === AnnotationType.PolyLine) {
                str += "/Vertices [";
                for (var i = 0, ii = this.vertices.length; i < ii; i++) {
                    str += this.vertices[i] + " ";
                }
                str += "]";
            } else if (this.type === AnnotationType.Ink) {
                str += "/InkList [";
                var gs = this.gestures;
                for (var i = 0, ii = gs.length; i < ii; i++) {
                    var cp = gs[i];
                    str += " [";
                    for (var j = 0, jj = cp.length; j < jj; j++) {
                        str += cp[j] + " ";
                    }
                    str += "] ";
                }
                str += "]";
            } else if (this.type === AnnotationType.FreeText) {
                var contentStr = "";
                for (var i = 0, ii = this.richContents.length; i < ii; i++) {
                    var rc = this.richContents[i];
                    contentStr += "<span style='font-size:" + rc.textSize + ";color:"
                            + rc.textColor + "'>" + rc.text + "</span>";
                }
                str += "/DA (/Arial " + this.textSize + " Tf)"
                        + "/RC (<body><p>" + contentStr + "</p></body>)";
            }

            if (this.type === AnnotationType.Line
                    || this.type === AnnotationType.Highlight
                    || this.type === AnnotationType.FreeText
                    || this.type === AnnotationType.Link
                    || this.type === AnnotationType.Square
                    || this.type === AnnotationType.Circle
                    || this.type === AnnotationType.Polygon
                    || this.type === AnnotationType.PolyLine
                    || this.type === AnnotationType.Ink) {
                if (this.opacity < 1.0) {
                    str += "/CA " + this.opacity;
                }
                if (this.width !== 1) {
                    str += "/BS <</Type /Border /W " + this.width + ">>";
                }
                if (this.fillColor.length > 0) {
                    str += "/IC [";
                    for (var i = 0, ii = this.fillColor.length; i < ii; i++) {
                        str += this.fillColor[i] + " ";
                    }
                    str += "]";
                }
                if (this.strokeColor.length > 0) {
                    str += "/C [";
                    for (var i = 0, ii = this.strokeColor.length; i < ii; i++) {
                        str += this.strokeColor[i] + " ";
                    }
                    str += "]";
                }
            }
            str += ">>";
            return str;
        }
    });
    Object.defineProperty(Annotation.prototype, "destroy", {
        value: function () {
            console.log("destroy method not defined contact - IDR SOLUTIONS");
            return true;
        }
    });
    Object.defineProperty(Annotation.prototype, "getProps", {
        value: function () {
            console.log("getProps method not defined contact - IDR SOLUTIONS");
            return true;
        }
    });
    Object.defineProperty(Annotation.prototype, "getStateInModel", {
        value: function () {
            console.log("getStateInModel method not defined contact - IDR SOLUTIONS");
            return true;
        }
    });
    Object.defineProperty(Annotation.prototype, "setProps", {
        value: function (objParam) {
            for (var nn in objParam) {
                if (nn in this) {
                    this[nn] = objParam[nn];
                }
            }
            return true;
        }
    });
    Object.defineProperty(Annotation.prototype, "transitionToState", {
        value: function (objParam) {
            console.log("transitionToState method not defined contact - IDR SOLUTIONS");
        }
    });

    function Bookmark() {
        this.children = null; //or array
        this.color = ["RGB", 1, 0, 0];
        this.name = "";
        this.open = true;
        this.parent = null;
        this.style = 0;
        this.createChild = function (cName, cExpr, nIndex) {
            console.log("createChild method not defined contact - IDR SOLUTIONS");
        };
        this.execute = function () {
            console.log("execute method not defined contact - IDR SOLUTIONS");
        };
        this.insertChild = function (oBookmark, nIndex) {
            console.log("insertChild method not defined contact - IDR SOLUTIONS");
        };
        this.remove = function () {
            console.log("remove method not defined contact - IDR SOLUTIONS");
        };
        this.setAction = function (cScript) {
            console.log("setAction method not defined contact - IDR SOLUTIONS");
        };
    }

    function Catalog() {
        this.isIdle = false;
        this.jobs = new Array();
        this.getIndex = function (cDIPath) {
            console.log("getIndex method not defined contact - IDR SOLUTIONS");
        };
        this.remove = function (oJob) {
            console.log("remove method not defined contact - IDR SOLUTIONS");
        };
    }

    function CatalogJob() {
        this.path = "";
        this.type = "";//Build,Rebuild,Delete
        this.status = "";//Pending,Processing,Completed,CompletedWithErrors    
    }

    function Certificate() {
        this.binary = "";
        this.issuerDN = {};
        this.keyUsage = new Array();
        //kDigitalSignature kDataEncipherment kCRLSign,kNonRepudiation kKeyAgreement,
        //kEncipherOnly,kKeyEncipherment kKeyCertSign kDecipherOnly    
        this.MD5Hash = "";
        this.privateKeyValidityEnd = {};
        this.privateKeyValidityStart = {};
        this.SHA1Hash = "";
        this.serialNumber = "";
        this.subjectCN = "";
        this.subjectDN = "";
        this.ubRights = {};
        this.usage = {};
        this.validityEnd = {};
        this.validityStart = {};
    }

    function Rights() {
        this.mode = ""; //Evaluation,Production
        this.rights = new Array();
        //FormFillInAndSave ,FormImportExport,FormAddDelete ,SubmitStandalone,
        //SpawnTemplate, Signing, AnnotModify, AnnotImportExport, BarcodePlaintext,
        //AnnotOnline, FormOnline, EFModify       
    }

    function Usage() {
        this.endUserSigning = false;
        this.endUserEncryption = false;
    }

    var Collab = {
        addStateModel: function (cName, cUIName, oStates, cDefault, bHidden, bHistory) {
            console.log("addStateModel not implemented");
        },
        documentToStream: function (oDocument) {
            console.log("documentToStream not implemented");
        },
        removeStateModel: function (cName) {
            console.log("removeStateModel not implemented");
        }
    };

    function States() {
        this.cUIName = "";
        this.oIcon = {};
    }

    function ColorConvertAction() {
        this.action = {};//constants.actions object
        this.alias = "";
        this.colorantName = "";
        this.convertIntent = 0;
        this.convertProfile = "";
        this.embed = false;
        this.isProcessColor = false;
        this.matchAttributesAll = {};//constants.objectFlags object
        this.matchAttributesAny = 0;
        this.matchIntent = {};
        this.matchSpaceTypeAll = {};//constants.spaceFlags object
        this.matchSpaceTypeAny = 0;
        this.preserveBlack = false;
        this.useBlackPointCompensation = false;
    }

    function Column() {
        this.columnNum - 0;
        this.name = "";
        this.type = 0;
        this.typeName = "";
        this.value = "";
    }

    function ColumnInfo() {
        this.name = "";
        this.description = "";
        this.type = "";
        this.typeName = "";
    }

    function Connection() {
        this.close = function () {
            console.log("close method not defined contact - IDR SOLUTIONS");
        };
        this.getColumnList = function (cName) {
            console.log("getColumnList method not defined contact - IDR SOLUTIONS");
        };
        this.getTableList = function () {
            console.log("getTableList method not defined contact - IDR SOLUTIONS");
        };
        this.newStatement = function () {
            console.log("newStatement method not defined contact - IDR SOLUTIONS");
        };
    }

    function Data() {
        this.creationDate = {};
        this.description = "";
        this.MIMEType = "";
        this.modDate = {};
        this.name = "";
        this.path = "";
        this.size = 0;
    }

    function DataSourceInfo() {
        this.name = "";
        this.description = "";
    }

    function dbg() {
        this.bps = new Array();
        this.c = new function () {
            console.log("c method not defined contact - IDR SOLUTIONS");
        };
        this.cb = function (fileName, lineNum) {
            console.log("cb method not defined contact - IDR SOLUTIONS");
        };
        this.q = function () {
            console.log("q method not defined contact - IDR SOLUTIONS");
        };
        this.sb = function (fileName, lineNum, condition) {
            console.log("sb method not defined contact - IDR SOLUTIONS");
        };
        this.si = function () {
            console.log("si method not defined contact - IDR SOLUTIONS");
        };
        this.sn = function () {
            console.log("sn method not defined contact - IDR SOLUTIONS");
        };
        this.so = function () {
            console.log("so method not defined contact - IDR SOLUTIONS");
        };
        this.sv = function () {
            console.log("sv method not defined contact - IDR SOLUTIONS");
        };
    }

    function Dialog() {
        this.enable = function (obj) {
            console.log("enable method not defined contact - IDR SOLUTIONS");
        };
        this.end = function (str) {
            console.log("end method not defined contact - IDR SOLUTIONS");
        };
        this.load = function (obj) {
            console.log("load method not defined contact - IDR SOLUTIONS");
        };
        this.store = function (obj) {
            console.log("store method not defined contact - IDR SOLUTIONS");
        };
    }

    function DirConnection() {
        this.canList = false;
        this.canDoCustomSearch = false;
        this.canDoCustomUISearch = false;
        this.canDoStandardSearch = false;
        this.groups = new Array();
        this.name = "";
        this.uiName = "";
    }

    function Directory() {
        this.info = {};
        this.connect = function (oParams, bUI) {
            console.log("connect method not defined contact - IDR SOLUTIONS");
            return null;
        };
    }

    function DirectoryInformation() {
        this.dirStdEntryID = "";
        this.dirStdEntryName = "";
        this.dirStdEntryPrefDirHandlerID = "";
        this.dirStdEntryDirType = "";
        this.dirStdEntryDirVersion = "";
        this.server = "";
        this.port = 0;
        this.searchBase = "";
        this.maxNumEntries = 0;
        this.timeout = 0;
    }

    function Icon() {
        this.name = "";
    }

    function IconStream() {
        this.width = 0;
        this.height = 0;
    }

    function Identity() {
        this.corporation = "";
        this.email = "";
        this.loginName = "";
        this.name = "";
    }

    function Index() {
        this.available = false;
        this.name = "";
        this.path = "";
        this.selected = false;
        this.build = function () {
            console.log("build is method not defined contact - IDR SOLUTIONS");
        };
        this.parameters = function () {
            console.log("parameters is method not defined contact - IDR SOLUTIONS");
        };
    }

    function Link(ele) {
        this.ele = ele;
        this.borderColor = [];
        this.borderWidth = 0;
        this.highlightMode = "invert";
        this.rect = [];
        this.setAction = function () {
            console.log("setAction is method not defined contact - IDR SOLUTIONS");
        };
    }

    function Marker() {
        this.frame = 0;
        this.index = 0;
        this.name = "";
        this.time = 0;
    }

    function Markers() {
        this.player = {};
        this.get = function (i) {
            console.log("get is method not defined contact - IDR SOLUTIONS");
        };
    }

    function Media() {
        this.align = {
            topLeft: 0, topCenter: 1, topRight: 2, centerLeft: 3, center: 4,
            centerRight: 5, bottomLeft: 6, bottomCenter: 7, bottomRight: 8
        };
        this.canResize = {
            no: 0, keepRatio: 1, yes: 2
        };
        this.closeReason = {
            general: 0, error: 1, done: 2, stop: 3, play: 4, uiGeneral: 5,
            uiScreen: 6, uiEdit: 7, docClose: 8, docSave: 9, docChange: 10
        };
        this.defaultVisible = true;
        this.ifOffScreen = {
            allow: 0, forseOnScreen: 1, cancel: 2
        };
        this.layout = {
            meet: 0, slice: 1, fill: 2, scroll: 3, hidden: 4, standard: 5
        };
        this.monitorType = {
            document: 0, nonDocument: 1, primary: 3, bestColor: 4, largest: 5,
            tallest: 6, widest: 7
        };
        this.openCode = {
            success: 0, failGeneral: 1, failSecurityWindow: 2, failPlayerMixed: 3,
            failPlayerSecurityPrompt: 4, failPlayerNotFound: 5, failPlayerMimeType: 6,
            failPlayerSecurity: 7, failPlayerData: 8
        };
        this.over = {
            pageWindow: 0, appWindow: 1, desktop: 2, monitor: 3
        };
        this.pageEventNames = {
            Open: 0, Close: 1, InView: 2, OutView: 3
        };
        this.raiseCode = {
            fileNotFound: 0, fileOpenFailed: 1
        };
        this.raiseSystem = {
            fileError: 0
        };
        this.renditionType = {
            unknown: 0, media: 1, selector: 2
        };
        this.status = {
            clear: 0, message: 1, contacting: 2, buffering: 3, init: 4, seeking: 5
        };
        this.trace = false;
        this.version = 7.0;
        this.windowType = {
            docked: 0, floating: 1, fullScreen: 2
        };
        this.addStockEvents = function (playerObj, annot) {
            console.log("addStockEvents method not defined contact - IDR SOLUTIONS");
        };
        this.alertFileNotFound = function (oDoc, cFileName, bCanSkipAlert) {
            console.log("alertFileNotFound method not defined contact - IDR SOLUTIONS");
        };
        this.alertSelectFailed = function (oDoc, oRejects, bCanSkipAlert, bFromUser) {
            console.log("alertFileNotFound method not defined contact - IDR SOLUTIONS");
        };
        this.argsDWIM = function (args) {
            console.log("argsDWIM method not defined contact - IDR SOLUTIONS");
        };
        this.canPlayOrAlert = function (args) {
            console.log("canPlayOrAlert method not defined contact - IDR SOLUTIONS");
        };
        this.computeFloatWinRect = function (doc, floating, monitorType, uiSize) {
            console.log("computeFloatWinRect method not defined contact - IDR SOLUTIONS");
        };
        this.constrainRectToScreen = function (rect, anchorPt) {
            console.log("constrainRectToScreen method not defined contact - IDR SOLUTIONS");
        };
        this.createPlayer = function (args) {
            console.log("createPlayer method not defined contact - IDR SOLUTIONS");
        };
        this.getAltTextData = function (cAltText) {
            console.log("getAltTextData method not defined contact - IDR SOLUTIONS");
        };
        this.getAltTextSettings = function () {
            console.log("getAltTextSettings method not defined contact - IDR SOLUTIONS");
        };
        this.getAnnotStockEvents = function () {
            console.log("getAnnotStockEvents method not defined contact - IDR SOLUTIONS");
        };
        this.getAnnotTraceEvents = function () {
            console.log("getAnnotTraceEvents method not defined contact - IDR SOLUTIONS");
        };
        this.getPlayers = function () {
            console.log("getPlayers method not defined contact - IDR SOLUTIONS");
        };
        this.getPlayerStockEvents = function () {
            console.log("getPlayerStockEvents method not defined contact - IDR SOLUTIONS");
        };
        this.getPlayerTraceEvents = function () {
            console.log("getPlayerTraceEvents method not defined contact - IDR SOLUTIONS");
        };
        this.getRenditionSettings = function () {
            console.log("getRenditionSettings method not defined contact - IDR SOLUTIONS");
        };
        this.getURLData = function () {
            console.log("getURLData method not defined contact - IDR SOLUTIONS");
        };
        this.getURLSettings = function () {
            console.log("getURLSettings method not defined contact - IDR SOLUTIONS");
        };
        this.getWindowBorderSize = function () {
            console.log("getWindowBorderSize method not defined contact - IDR SOLUTIONS");
        };
        this.openPlayer = function () {
            console.log("openPlayer method not defined contact - IDR SOLUTIONS");
        };
        this.removeStockEvents = function () {
            console.log("removeStockEvents method not defined contact - IDR SOLUTIONS");
        };
        this.startPlayer = function () {
            console.log("startPlayer method not defined contact - IDR SOLUTIONS");
        };
    }

    function MediaOffset() {
        this.frame = 0;
        this.marker = "";
        this.time = 0;
    }

    function MediaPlayer() {
        this.annot = {};
        this.defaultSize = {width: 0, height: 0};
        this.doc = {};
        this.events = {};
        this.hasFocus = false;
        this.id = 0;
        this.innerRect = [];
        this.isOpen = false;
        this.isPlaying = false;
        this.outerRect = [];
        this.page = 0;
        this.settings = {};
        this.uiSize = [];
        this.visible = false;

        this.close = function () {
            console.log("close is not implemented");
        };
        this.open = function () {
            console.log("open is not implemented");
        };
        this.pause = function () {
            console.log("pause is not implemented");
        };
        this.play = function () {
            console.log("play is not implemented");
        };
        this.seek = function () {
            console.log("seek is not implemented");
        };
        this.setFocus = function () {
            console.log("setFocus is not implemented");
        };
        this.stop = function () {
            console.log("stop is not implemented");
        };
        this.triggerGetRect = function () {
            console.log("triggerGetRect is not implemented");
        };
    }

    function MediaReject() {
        this.rendition = {};
    }

    function MediaSelection() {
        this.selectContext = {};
        this.players = [];
        this.rejects = [];
        this.rendtion = {};
    }

    function MediaSettings() {
        this.autoPlay = false;
        this.baseURL = "";
        this.bgColor = [];
        this.bgOpacity = 1.0;
        this.data = {};
        this.duration = 0;
        this.endAt = 0;
        this.floating = {};
        this.layout = 0;
        this.monitor = {};
        this.monitorType = 0;
        this.page = 0;
        this.palindrome = false;
        this.players = {};
        this.rate = 0;
        this.repeat = 0;
        this.showUI = false;
        this.startAt = {};
        this.visible = false;
        this.volume = 0;
        this.windowType = 0;
    }

    function Monitor() {
        this.colorDepth = 0;
        this.isPrimary = false;
        this.rect = [];
        this.workRect = [];
    }

    function Monitors() {
        this.bestColor = function () {
            console.log("bestColor is not implemented");
        };
        this.bestFit = function () {
            console.log("bestFit is not implemented");
        };
        this.desktop = function () {
            console.log("desktop is not implemented");
        };
        this.document = function () {
            console.log("document is not implemented");
        };
        this.filter = function () {
            console.log("filter is not implemented");
        };
        this.largest = function () {
            console.log("largest is not implemented");
        };
        this.leastOverlap = function () {
            console.log("leastOverlap is not implemented");
        };
        this.mostOverlap = function () {
            console.log("mostOverlap is not implemented");
        };
        this.nonDocument = function () {
            console.log("nonDocument is not implemented");
        };
        this.primary = function () {
            console.log("primary is not implemented");
        };
        this.secondary = function () {
            console.log("secondary is not implemented");
        };
        this.select = function () {
            console.log("select is not implemented");
        };
        this.tallest = function () {
            console.log("tallest is not implemented");
        };
        this.widest = function () {
            console.log("widest is not implemented");
        };
    }

    function Net() {
        this.SOAP = {};
        this.Discovery = {};
        this.HTTP = {};
        this.streamDecode = function () {
            console.log("streamDecode is not implemented");
        };
        this.streamDigest = function () {
            console.log("streamDigest is not implemented");
        };
        this.streamEncode = function () {
            console.log("streamEncode is not implemented");
        };
    }

    function OCG() {
        this.constants = {};
        this.initState = false;
        this.locked = false;
        this.name = "";
        this.state = false;
        this.getIntent = function () {
            console.log("getIntent is not implemented");
        };
        this.setAction = function () {
            console.log("setAction is not implemented");
        };
        this.setIntent = function () {
            console.log("setIntent is not implemented");
        };
    }

    function PlayerInfo() {
        this.id = "";
        this.mimeTypes = [];
        this.name = "";
        this.version = "";
        this.canPlay = function () {
            console.log("canPlay is not implemented");
        };
        this.canUseData = function () {
            console.log("canUseData is not implemented");
        };
        this.honors = function () {
            console.log("honors is not implemented");
        };
    }

    function PlayerInfoList() {
        this.select = function () {
            console.log("select is not implemented");
        };
    }

    function Plugin() {
        this.certified = false;
        this.loaded = false;
        this.name = "";
        this.path = "";
        this.version = 0;
    }

    function Booklet() {
        this.binding = 0;
        this.duplexMode = 0;
        this.subsetForm = 0;
        this.subsetTo = 0;
    }

    function PrintParams() {
        this.binaryOK = true;
        this.bitmapDPI = 0;
        this.booklet = new Booklet();
        this.colorOverride = 0;
        this.colorProfile = "";
        this.constants = {};
        this.downloadFarEastFonts = false;
        this.fileName = "";
        this.firstPage = 0;
        this.flags = 0;
        this.fontPolicy = 0;
        this.gradientDPI = 0;
        this.interactive = 0;
        this.lastPage = 0;
        this.nUpAutoRotate = false;
        this.nUpNumPagesH = 0;
        this.nUpNumPagesV = 0;
        this.nUpPageBorder = false;
        this.nUpPageOrder = 0;
        this.pageHandling = 0;
        this.pageSubset = 0;
        this.printAsImage = false;
        this.printContent = 0;
        this.printName = "";
        this.psLevel = 0;
        this.rasterFlags = 0;
        this.reversePages = false;
        this.tileLabel = false;
        this.tileMark = 0;
        this.tileOverlap = 0;
        this.tileScale = 0;
        this.transparencyLevel = 0;
        this.usePrinterCRD = 0;
        this.useT1Conversion = 0;
    }

    function Span() {
        this.alignement = 0;
        this.fontFamily = ["serif", "sans-serif", "monospace"];
        this.fontStretch = "normal";
        this.fontStyle = "normal";
        this.fontWeight = 400;
        this.strikeThrough = false;
        this.subscript = false;
        this.superscript = false;
        this.text = "";
        this.textColor = color.black;
        this.textSize = 12;
        this.underline = false;
    }

    function Thermometer() {
        this.cancelled = false;
        this.duration = 0;
        this.text = "";
        this.value = 0;
        this.begin = function() {
             console.log("begin method not defined contact - IDR SOLUTIONS");
        };
        this.end = function() {
             console.log("end method not defined contact - IDR SOLUTIONS");
        }
    }

    var util = {
        crackURL: function (cURL) {
            console.log("crackURL method not defined contact - IDR SOLUTIONS");
            return {};
        },
        iconStreamFromIcon: function () {
            console.log("iconStreamFromIcon method not defined contact - IDR SOLUTIONS");
            return {};
        },
        printd: function (cFormat, oDate, bXFAPicture) {
            var MONTHS = [
                "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
            ];
            var DAYS = [
                "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"
            ];
            switch (cFormat) {
                case 0:
                    return this.printd("D:yyyymmddHHMMss", oDate);
                case 1:
                    return this.printd("yyyy.mm.dd HH:MM:ss", oDate);
                case 2:
                    return this.printd("m/d/yy h:MM:ss tt", oDate);
            }
            var data = {
                year: oDate.getFullYear(),
                month: oDate.getMonth(),
                day: oDate.getDate(),
                dayOfWeek: oDate.getDay(),
                hours: oDate.getHours(),
                minutes: oDate.getMinutes(),
                seconds: oDate.getSeconds(),
            };
            var CPATTERN = /(mmmm|mmm|mm|m|dddd|ddd|dd|d|yyyy|yy|HH|H|hh|h|MM|M|ss|s|tt|t|\\.)/g;
            return cFormat.replace(CPATTERN, function (match, pattern) {
                switch (pattern) {
                    case "mmmm":
                        return MONTHS[data.month];
                    case "mmm":
                        return MONTHS[data.month].substring(0, 3);
                    case "mm" :
                        return (data.month + 1).toString().padStart(2, "0");
                    case "m" :
                        return (data.month + 1).toString();
                    case "dddd" :
                        return DAYS[data.dayOfWeek];
                    case "ddd" :
                        return DAYS[data.dayOfWeek].substring(0, 3);
                    case "dd" :
                        return data.day.toString().padStart(2, "0");
                    case "d" :
                        return data.day.toString();
                    case "yyyy" :
                        return data.year.toString();
                    case "yy" :
                        return (data.year % 100).toString().padStart(2, "0");
                    case "HH" :
                        return data.hours.toString().padStart(2, "0");
                    case  "H" :
                        return data.hours.toString();
                    case "hh":
                        return (1 + ((data.hours + 11) % 12)).toString().padStart(2, "0");
                    case "h" :
                        return (1 + ((data.hours + 11) % 12)).toString();
                    case "MM" :
                        return data.minutes.toString().padStart(2, "0");
                    case "M" :
                        return data.minutes.toString();
                    case "ss":
                        return data.seconds.toString().padStart(2, "0");
                    case "s" :
                        return data.seconds.toString();
                    case "tt":
                        return data.hours < 12 ? "am" : "pm";
                    case "t" :
                        return data.hours < 12 ? "a" : "p";
                }
                return pattern.charCodeAt(1);
            });
        },
        printf: function (cFormat, arguments) {
            var start = cFormat.indexOf("%");
            if (start === -1) {
                return cFormat + " " + arguments;
            }
            var gapFormat = cFormat[start + 1];
            var decimalPoint = cFormat.indexOf(".");
            var decimalCount = cFormat[decimalPoint + 1];
            var num = arguments.toFixed(decimalCount);
            // support for mask/currency symbol
            if (start > 0) {
                num = cFormat.substring(0, start) + num;
            }
            return num;
        },
        printx: function (cFormat, cSource) {
            var  handlers = [x => x, x => x.toUpperCase(), x => x.toLowerCase()];
                var  buf = [];
                var  i = 0, ii = cSource.length;
                var  currCase = handlers[0];
                var  escaped = false;
                for (var command of cFormat) {
                    if (escaped) {
                        buf.push(command);
                        escaped = false;
                        continue;
                    }
                    if (i >= ii) {
                        break;
                    }
                    switch (command) {
                        case "?":
                            buf.push(currCase(cSource.charAt(i++)));
                            break;
                        case "X":
                            while (i < ii) {
                            var  char = cSource.charAt(i++);
                            if ( ("a" <= char && char <= "z") || ("A" <= char && char <= "Z") || ("0" <= char && char <= "9") ) {
                                buf.push(currCase(char));
                                break;
                            }
                        }
                        break;
                    case "A":
                        while (i < ii) {
                            var  char = cSource.charAt(i++);
                            if (("a" <= char && char <= "z") || ("A" <= char && char <= "Z")) {
                                buf.push(currCase(char));
                                break;
                            }
                        }
                        break;
                    case "9":
                        while (i < ii) {
                            var  char = cSource.charAt(i++);
                            if ("0" <= char && char <= "9") {
                                buf.push(char);
                                break;
                            }
                        }
                        break;
                    case "*":
                      while (i < ii) {
                        buf.push(currCase(cSource.charAt(i++)));
                      }
                      break;
                    case "\\":
                        escaped = true;
                        break;
                    case ">":
                        currCase = handlers[1];
                        break;
                    case "<":
                        currCase = handlers[2];
                        break;
                    case "=":
                        currCase = handlers[0];
                        break;
                    default:
                        buf.push(command);
                    }
                }
                return buf.join("");
        },
        scand: function (cPattern, cText) {
            var pArr = cPattern.split(/[ \-:\/\.]/);
            var tArr = cText.split(/[ \-:\/\.]/);
            if (pArr.length != tArr.length) {
                return null;
            }
            var pDate = new Date();
            for (var i = 0; i < pArr.length; i++) {
                var t = tArr[i];
                t = t.toUpperCase();
                switch (pArr[i]) {
                    case "d":
                    case "dd":
                        if (isNaN(t)) {
                            return null;
                        }
                        pDate.setDate(parseInt(t));
                        break;
                    case "m":
                    case "mm":
                        if (isNaN(t)) {
                            return null;
                        }
                        var t = parseInt(t);
                        if (t == 0 || t > 12) {
                            return null;
                        }
                        pDate.setMonth(t);
                        break;
                    case "mmm":
                    case "mmmm":
                        if (isNaN(t)) {
                            var MONTHS = [
                                "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
                            ];
                            var m = -1;
                            for (var j = 0, jj = MONTHS.length; j < jj; j++) {
                                if (MONTHS[j].indexOf(t) !== -1) {
                                    m = j;
                                    break;
                                }
                            }
                            if (m === -1) {
                                return null;
                            }
                            pDate.setMonth(m);
                        } else {
                            pDate.setMonth(parseInt(t) - 1);
                        }
                        break;
                    case "y":
                    case "yy":
                        if (isNaN(t)) {
                            return null;
                        }
                        pDate.setFullYear(parseInt(t));
                        break;
                    case "yyy":
                    case "yyyy":
                        if (isNaN(t) || t.length != pArr[i].length) {
                            return null;
                        }
                        pDate.setFullYear(parseInt(t));
                        break;
                    case "H":
                    case "HH":
                        if (isNaN(t)) {
                            return null;
                        }
                        pDate.setHours(parseInt(t));
                        break;
                    case "M":
                    case "MM":
                        if (isNaN(t)) {
                            return null;
                        }
                        pDate.setMinutes(parseInt(t));
                    case "s":
                    case "ss":
                        if (isNaN(t)) {
                            return null;
                        }
                        pDate.setSeconds(parseInt(t));
                }
            }
            return pDate;
        },
        spansToXML: function (spanObjects) {
            console.log("method not defined contact - IDR SOLUTIONS");
        },
        streamFromString: function (cString, cCharSet) {
            console.log("method not defined contact - IDR SOLUTIONS");
        },
        stringFromStream: function (oStream, cCharSet) {
            console.log("method not defined contact - IDR SOLUTIONS");
        },
        xmlToSpans: function (string) {
            console.log("method not defined contact - IDR SOLUTIONS");
        }
    };

    var JSRESERVED = [
        "break", "delete", "function", "return", "typeof", "case", "do", "if",
        "switch", "var", "catch", "else", "in", "this", "void", "continue", "false",
        "instanceof", "throw", "while", "debugger", "finally", "new", "true", "with",
        "default", "for", "null", "try", "class", "const", "enum", "export", "extends",
        "import", "super", "implements", "let", "private", "public", "yield",
        "interface", "package", "protected", "static",
        "abstract", "double", "goto", "native", "static", "boolean", "enum",
        "implements", "package", "super", "byte", "export", "import", "private",
        "synchronized", "char", "extends", "int", "protected", "throws", "class",
        "final", "interface", "public", "transient", "const", "float", "long",
        "short", "volatile",
        "arguments", "encodeURI", "Infinity", "Number", "RegExp", "Array",
        "encodeURIComponent", "isFinite", "Object", "String", "Boolean", "Error",
        "isNaN", "parseFloat", "SyntaxError", "Date", "eval", "JSON", "parseInt",
        "TypeError", "decodeURI", "EvalError", "Math", "RangeError", "undefined",
        "decodeURIComponent", "Function", "NaN", "ReferenceError", "URIError"
    ];

    var EcmaFilter = {
        decode: function (name, data) {
            if (name === "FlateDecode") {
                var ef = new EcmaFlate();
                var input = [];
                var a = 0;
                for (var i = 2, ii = data.length; i < ii; i++) {
                    input[a++] = data[i];
                }
                return ef.decode(input);
            } else if (name === "ASCII85Decode") {
                var as8 = new EcmaAscii85();
                return as8.decode(data);
            } else if (name === "ASCIIHexDecode") {
                var ash = new EcmaAsciiHex();
                return ash.decode(data);
            } else if (name === "RunLengthDecode") {
                var rlc = new EcmaRunLength();
                return rlc.decode();
            } else {
                console.log("This type of decoding is not supported yet : " + name);
                return data;
            }
        },
        applyPredictor: function (data, mainPred, bos, colors, bpc, columns, earlychange) {
            if (mainPred === 1) {
                return data;
            }
            var predictor;
            var bytesAvailable = data.length;
            var bis = new EcmaBuffer(data);

            var bpp = (colors * bpc + 7) >> 3;
            var rowLength = ((columns * colors * bpc + 7) >> 3) + bpp;

            var thisLine = this.createByteBuffer(rowLength);
            var lastLine = this.createByteBuffer(rowLength);
            var curPred;
            var count = 0, byteCount = 0;
            while (true) {
                if (bytesAvailable <= byteCount) {
                    break;
                }
                predictor = mainPred;
                var i = 0;
                var offset = bpp;
                if (predictor >= 10) {
                    curPred = bis.getByte();
                    if (curPred === -1) {
                        break;
                    }
                    curPred += 10;
                } else {
                    curPred = predictor;
                }
                while (offset < rowLength) {
                    i = bis.readTo(thisLine, offset, rowLength - offset);
                    if (i === -1) {
                        break;
                    }
                    offset += i;
                    byteCount += i;
                }
                if (i === -1) {
                    break;
                }
                switch (curPred) {
                    case 2:
                        for (var i1 = bpp; i1 < rowLength; i1++) {
                            var sub = thisLine[i1] & 0xff;
                            var raw = thisLine[i1 - bpp] & 0xff;
                            thisLine[i1] = (sub + raw) & 0xff;
                            if (bos) {
                                bos[count] = thisLine[i1];
                            }
                            count++;
                        }
                        break;
                    case 10:
                        for (var i1 = bpp; i1 < rowLength; i1++) {
                            if (bos) {
                                bos[count] = thisLine[i1] & 0xff;
                            }
                            count++;
                        }
                        break;
                    case 11:
                        for (var i1 = bpp; i1 < rowLength; i1++) {
                            var sub = thisLine[i1] & 0xff;
                            var raw = thisLine[i1 - bpp] & 0xff;
                            thisLine[i1] = sub + raw;
                            if (bos) {
                                bos[count] = thisLine[i1] & 0xff;
                            }
                            count++;
                        }
                        break;
                    case 12:
                        for (var i1 = bpp; i1 < rowLength; i1++) {
                            var sub = (lastLine[i1] & 0xff) + (thisLine[i1] & 0xff);
                            thisLine[i1] = sub;
                            if (bos) {
                                bos[count] = thisLine[i1] & 0xff;
                            }
                            count++;
                        }
                        break;
                    case 13:
                        for (var i1 = bpp; i1 < rowLength; i1++) {
                            var av = thisLine[i1] & 0xff;
                            var ff = ((thisLine[i1 - bpp] & 0xff) + (lastLine[i1] & 0xff) >> 1);
                            thisLine[i1] = av + ff;
                            if (bos) {
                                bos[count] = thisLine[i1] & 0xff;
                            }
                            count++;
                        }
                        break;
                    case 14:
                        for (var i1 = bpp; i1 < rowLength; i1++) {
                            var a = thisLine[i1 - bpp] & 0xff;
                            var b = lastLine[i1] & 0xff;
                            var c = lastLine[i1 - bpp] & 0xff;
                            var p = a + b - c;
                            var pa = p - a, pb = p - b, pc = p - c;
                            pa = pa < 0 ? -pa : pa;
                            pb = pb < 0 ? -pb : pb;
                            pc = pc < 0 ? -pc : pc;
                            if (pa <= pb && pa <= pc) {
                                thisLine[i1] = thisLine[i1] + a;
                            } else if (pb <= pc) {
                                thisLine[i1] = thisLine[i1] + b;
                            } else {
                                thisLine[i1] = thisLine[i1] + c;
                            }
                            if (bos) {
                                bos[count] = thisLine[i1] & 0xff;
                            }
                            count++;
                        }
                        break;
                    case 15:
                        break;
                }
                for (var i = 0; i < rowLength; i++) {
                    lastLine[i] = thisLine[i];
                }
            }
            return count;
        },
        createByteBuffer: function (size) {
            var arr = [];
            for (var i = 0; i < size; i++) {
                arr.push(0);
            }
            return arr;
        },
        decodeBase64: function (bStr) {
            var hashKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var enc1, enc2, enc3, enc4;
            var output = [];
            var input = bStr.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            var ii = input.length;
            var i = 0;
            while (i < ii) {
                enc1 = hashKey.indexOf(input.charAt(i++));
                enc2 = hashKey.indexOf(input.charAt(i++));
                enc3 = hashKey.indexOf(input.charAt(i++));
                enc4 = hashKey.indexOf(input.charAt(i++));
                output.push((enc1 << 2) | (enc2 >> 4));
                if (enc3 !== 64) {
                    output.push(((enc2 & 15) << 4) | (enc3 >> 2));
                }
                if (enc4 !== 64) {
                    output.push(((enc3 & 3) << 6) | enc4);
                }
            }
            return output;
        },
        encodeBase64: function (inputArr) { //input is byte array
            var hashKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            var iLen = inputArr.length;
            while (i < iLen) {
                chr1 = inputArr[i++];
                chr2 = inputArr[i++];
                chr3 = inputArr[i++];
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output += hashKey.charAt(enc1) + hashKey.charAt(enc2) +
                        hashKey.charAt(enc3) + hashKey.charAt(enc4);
            }
            return output;
        }
    };

    function EcmaFlate() {
        this.decode = function (data) {
            var res, buff;
            var k, j, buffLen = 1024;
            zip_wp = 0;
            bitsBuffer = 0;
            bitsLength = 0;
            flateType = -1;
            isEOF = false;
            zip_copy_leng = zip_copy_dist = 0;
            zip_tl = null;

            flateData = data;
            flatePos = 0;

            buff = new Array(buffLen);
            res = [];
            while ((k = inflateChunks(buff, 0, buffLen)) > 0) {
                for (j = 0; j < k; j++) {
                    res.push(buff[j]);
                }
            }
            flateData = null;
            return res;
        };

        var MASK_BITS = [
            0x0000, 0x0001, 0x0003, 0x0007, 0x000f, 0x001f, 0x003f, 0x007f, 0x00ff,
            0x01ff, 0x03ff, 0x07ff, 0x0fff, 0x1fff, 0x3fff, 0x7fff, 0xffff
        ];
        var CODE_LENGTHS = [
            3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
            67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
        ];
        var CODE_DISTANCES = [
            1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513,
            769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577
        ];
        var FLATE_MARGINS = [
            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
        ];
        var zip_cplext = [
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
            5, 5, 5, 5, 0, 99, 99
        ];
        var zip_cpdext = [
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
            10, 11, 11, 12, 12, 13, 13
        ];

        var WINDOW_SIZE = 32768;
        var STORED_BLOCK = 0;
        var windowSlides = new Array(WINDOW_SIZE << 1);
        var flateType;
        var flateData;
        var flatePos;
        var bitsBuffer;
        var bitsLength;
        var isEOF;
        var zip_wp;
        var zip_fixed_tl = null;
        var zip_fixed_td, zip_fixed_bl, zip_fixed_bd;
        var zip_copy_leng, zip_copy_dist;
        var zip_lbits = 9, zip_dbits = 6;
        var zip_tl, zip_td;
        var zip_bl, zip_bd;

        function readByte() {
            if (flateData.length === flatePos) {
                return -1;
            }
            return flateData[flatePos++] & 0xff;
        }
        function readBits(x) {
            return bitsBuffer & MASK_BITS[x];
        }
        function HuffmanTableList() {
            this.next = null;
            this.list = null;
        }
        function HuffmanTableNode() {
            this.e = 0;
            this.b = 0;
            this.n = 0;
            this.t = null;
        }
        function HuffmanTableBlock(b, n, s, d, e, mm) {
            this.BMAX = 16;
            this.N_MAX = 288;
            this.status = 0;
            this.root = null;
            this.m = 0;
            {
                var a, c = new Array(this.BMAX + 1);
                var el, f, g, h, i, j, k, lx = new Array(this.BMAX + 1);
                var p, pidx, q;
                var r = new HuffmanTableNode();
                var u = new Array(this.BMAX);
                var v = new Array(this.N_MAX);
                var x = new Array(this.BMAX + 1);
                var w, xp, y, z, o, tail;
                tail = this.root = null;
                for (i = 0; i < c.length; i++) {
                    c[i] = 0;
                }
                for (i = 0; i < lx.length; i++) {
                    lx[i] = 0;
                }
                for (i = 0; i < u.length; i++) {
                    u[i] = null;
                }
                for (i = 0; i < v.length; i++) {
                    v[i] = 0;
                }
                for (i = 0; i < x.length; i++) {
                    x[i] = 0;
                }
                el = n > 256 ? b[256] : this.BMAX;
                p = b;
                pidx = 0;
                i = n;
                do {
                    c[p[pidx]]++;
                    pidx++;
                } while (--i > 0);
                if (c[0] === n) {
                    this.root = null;
                    this.m = 0;
                    this.status = 0;
                    return;
                }
                for (j = 1; j <= this.BMAX; j++) {
                    if (c[j] !== 0) {
                        break;
                    }
                }
                k = j;
                if (mm < j) {
                    mm = j;
                }
                for (i = this.BMAX; i !== 0; i--) {
                    if (c[i] !== 0) {
                        break;
                    }
                }
                g = i;
                if (mm > i) {
                    mm = i;
                }
                for (y = 1 << j; j < i; j++, y <<= 1) {
                    if ((y -= c[j]) < 0) {
                        this.status = 2;
                        this.m = mm;
                        return;
                    }
                }
                if ((y -= c[i]) < 0) {
                    this.status = 2;
                    this.m = mm;
                    return;
                }
                c[i] += y;

                x[1] = j = 0;
                p = c;
                pidx = 1;
                xp = 2;
                while (--i > 0) {
                    x[xp++] = (j += p[pidx++]);
                }

                p = b;
                pidx = 0;
                i = 0;
                do {
                    if ((j = p[pidx++]) !== 0) {
                        v[x[j]++] = i;
                    }
                } while (++i < n);
                n = x[g];
                x[0] = i = 0;
                p = v;
                pidx = 0;
                h = -1;
                w = lx[0] = 0;
                q = null;
                z = 0;

                for (; k <= g; k++) {
                    a = c[k];
                    while (a-- > 0) {
                        while (k > w + lx[1 + h]) {
                            w += lx[1 + h];
                            h++;
                            z = (z = g - w) > mm ? mm : z;
                            if ((f = 1 << (j = k - w)) > a + 1) {
                                f -= a + 1;
                                xp = k;
                                while (++j < z) {
                                    if ((f <<= 1) <= c[++xp])
                                        break;
                                    f -= c[xp];
                                }
                            }
                            if (w + j > el && w < el)
                                j = el - w;
                            z = 1 << j;
                            lx[1 + h] = j;

                            q = new Array(z);
                            for (o = 0; o < z; o++) {
                                q[o] = new HuffmanTableNode();
                            }

                            if (tail) {
                                tail = tail.next = new HuffmanTableList();
                            } else {
                                tail = this.root = new HuffmanTableList();
                            }
                            tail.next = null;
                            tail.list = q;
                            u[h] = q;
                            if (h > 0) {
                                x[h] = i;
                                r.b = lx[h];
                                r.e = 16 + j;
                                r.t = q;
                                j = (i & ((1 << w) - 1)) >> (w - lx[h]);
                                u[h - 1][j].e = r.e;
                                u[h - 1][j].b = r.b;
                                u[h - 1][j].n = r.n;
                                u[h - 1][j].t = r.t;
                            }
                        }

                        r.b = k - w;
                        if (pidx >= n) {
                            r.e = 99;
                        } else if (p[pidx] < s) {
                            r.e = (p[pidx] < 256 ? 16 : 15);
                            r.n = p[pidx++];
                        } else {
                            r.e = e[p[pidx] - s];
                            r.n = d[p[pidx++] - s];
                        }

                        f = 1 << (k - w);
                        for (j = i >> w; j < z; j += f) {
                            q[j].e = r.e;
                            q[j].b = r.b;
                            q[j].n = r.n;
                            q[j].t = r.t;
                        }

                        for (j = 1 << (k - 1); (i & j) !== 0; j >>= 1) {
                            i ^= j;
                        }
                        i ^= j;

                        while ((i & ((1 << w) - 1)) !== x[h]) {
                            w -= lx[h];
                            h--;
                        }
                    }
                }

                this.m = lx[1];
                this.status = ((y !== 0 && g !== 1) ? 1 : 0);
            }
        }

        function zip_NEEDBITS(n) {
            while (bitsLength < n) {
                bitsBuffer |= readByte() << bitsLength;
                bitsLength += 8;
            }
        }

        function ignoreBits(n) {
            bitsBuffer >>= n;
            bitsLength -= n;
        }

        function decodeHFC(buff, off, size) {

            if (size === 0) {
                return 0;
            }
            var e, t, n = 0;
            while (true) {
                zip_NEEDBITS(zip_bl);
                t = zip_tl.list[readBits(zip_bl)];
                e = t.e;
                while (e > 16) {
                    if (e === 99) {
                        return -1;
                    }
                    ignoreBits(t.b);
                    e -= 16;
                    zip_NEEDBITS(e);
                    t = t.t[readBits(e)];
                    e = t.e;
                }
                ignoreBits(t.b);

                if (e === 16) {
                    zip_wp &= WINDOW_SIZE - 1;
                    buff[off + n++] = windowSlides[zip_wp++] = t.n;
                    if (n === size) {
                        return size;
                    }
                    continue;
                }

                if (e === 15) {
                    break;
                }
                zip_NEEDBITS(e);
                zip_copy_leng = t.n + readBits(e);
                ignoreBits(e);

                zip_NEEDBITS(zip_bd);
                t = zip_td.list[readBits(zip_bd)];
                e = t.e;

                while (e > 16) {
                    if (e === 99) {
                        return -1;
                    }
                    ignoreBits(t.b);
                    e -= 16;
                    zip_NEEDBITS(e);
                    t = t.t[readBits(e)];
                    e = t.e;
                }
                ignoreBits(t.b);
                zip_NEEDBITS(e);
                zip_copy_dist = zip_wp - t.n - readBits(e);
                ignoreBits(e);

                while (zip_copy_leng > 0 && n < size) {
                    zip_copy_leng--;
                    zip_copy_dist &= WINDOW_SIZE - 1;
                    zip_wp &= WINDOW_SIZE - 1;
                    buff[off + n++] = windowSlides[zip_wp++] = windowSlides[zip_copy_dist++];
                }
                if (n === size) {
                    return size;
                }
            }

            flateType = -1;
            return n;
        }

        function decodeHFCS(buff, off, size) {
            var n;
            n = bitsLength & 7;
            ignoreBits(n);
            zip_NEEDBITS(16);
            n = readBits(16);
            ignoreBits(16);
            zip_NEEDBITS(16);
            if (n !== ((~bitsBuffer) & 0xffff))
                return -1;
            ignoreBits(16);

            zip_copy_leng = n;

            n = 0;
            while (zip_copy_leng > 0 && n < size) {
                zip_copy_leng--;
                zip_wp &= WINDOW_SIZE - 1;
                zip_NEEDBITS(8);
                buff[off + n++] = windowSlides[zip_wp++] = readBits(8);
                ignoreBits(8);
            }

            if (zip_copy_leng === 0) {
                flateType = -1;
            }
            return n;
        }

        function decodeHFCF(buff, off, size) {
            if (zip_fixed_tl === null) {
                var i, h;
                var l = new Array(288);

                for (i = 0; i < 144; i++) {
                    l[i] = 8;
                }
                for (; i < 256; i++) {
                    l[i] = 9;
                }
                for (; i < 280; i++) {
                    l[i] = 7;
                }
                for (; i < 288; i++) {
                    l[i] = 8;
                }
                zip_fixed_bl = 7;

                h = new HuffmanTableBlock(l, 288, 257, CODE_LENGTHS, zip_cplext, zip_fixed_bl);
                if (h.status !== 0) {
                    throw("EcmaFlateDecodeError : Huffman Status " + h.status);
                    return -1;
                }
                zip_fixed_tl = h.root;
                zip_fixed_bl = h.m;
                for (i = 0; i < 30; i++) {
                    l[i] = 5;
                }
                zip_fixed_bd = 5;
                h = new HuffmanTableBlock(l, 30, 0, CODE_DISTANCES, zip_cpdext, zip_fixed_bd);
                if (h.status > 1) {
                    zip_fixed_tl = null;
                    throw("EcmaFlateDecodeError : Huffman Status" + h.status);
                    return -1;
                }
                zip_fixed_td = h.root;
                zip_fixed_bd = h.m;
            }
            zip_tl = zip_fixed_tl;
            zip_td = zip_fixed_td;
            zip_bl = zip_fixed_bl;
            zip_bd = zip_fixed_bd;
            return decodeHFC(buff, off, size);
        }

        function decodeHFCD(buff, off, size) {
            var i, j, l, n, t, nb, nl, nd, h;
            var ll = new Array(286 + 30);
            for (i = 0; i < ll.length; i++) {
                ll[i] = 0;
            }
            zip_NEEDBITS(5);
            nl = 257 + readBits(5);
            ignoreBits(5);
            zip_NEEDBITS(5);
            nd = 1 + readBits(5);
            ignoreBits(5);
            zip_NEEDBITS(4);
            nb = 4 + readBits(4);
            ignoreBits(4);
            if (nl > 286 || nd > 30) {
                return -1;
            }
            for (j = 0; j < nb; j++) {
                zip_NEEDBITS(3);
                ll[FLATE_MARGINS[j]] = readBits(3);
                ignoreBits(3);
            }
            for (; j < 19; j++) {
                ll[FLATE_MARGINS[j]] = 0;
            }
            zip_bl = 7;
            h = new HuffmanTableBlock(ll, 19, 19, null, null, zip_bl);
            if (h.status !== 0) {
                return -1;
            }
            zip_tl = h.root;
            zip_bl = h.m;
            n = nl + nd;
            i = l = 0;
            while (i < n) {
                zip_NEEDBITS(zip_bl);
                t = zip_tl.list[readBits(zip_bl)];
                j = t.b;
                ignoreBits(j);
                j = t.n;
                if (j < 16)
                    ll[i++] = l = j;
                else if (j === 16) {
                    zip_NEEDBITS(2);
                    j = 3 + readBits(2);
                    ignoreBits(2);
                    if (i + j > n)
                        return -1;
                    while (j-- > 0)
                        ll[i++] = l;
                } else if (j === 17) {
                    zip_NEEDBITS(3);
                    j = 3 + readBits(3);
                    ignoreBits(3);
                    if (i + j > n)
                        return -1;
                    while (j-- > 0)
                        ll[i++] = 0;
                    l = 0;
                } else {
                    zip_NEEDBITS(7);
                    j = 11 + readBits(7);
                    ignoreBits(7);
                    if (i + j > n)
                        return -1;
                    while (j-- > 0)
                        ll[i++] = 0;
                    l = 0;
                }
            }
            zip_bl = zip_lbits;
            h = new HuffmanTableBlock(ll, nl, 257, CODE_LENGTHS, zip_cplext, zip_bl);
            if (zip_bl === 0) {
                h.status = 1;
            }
            if (h.status !== 0) {
                return -1;
            }
            zip_tl = h.root;
            zip_bl = h.m;

            for (i = 0; i < nd; i++)
                ll[i] = ll[i + nl];
            zip_bd = zip_dbits;
            h = new HuffmanTableBlock(ll, nd, 0, CODE_DISTANCES, zip_cpdext, zip_bd);
            zip_td = h.root;
            zip_bd = h.m;
            if (zip_bd === 0 && nl > 257 || h.status !== 0) {
                return -1;
            }
            return decodeHFC(buff, off, size);
        }

        function inflateChunks(buff, off, size) {
            var n = 0, i;
            while (n < size) {
                if (isEOF && flateType === -1) {
                    return n;
                }
                if (zip_copy_leng > 0) {
                    if (flateType !== STORED_BLOCK) {
                        while (zip_copy_leng > 0 && n < size) {
                            zip_copy_leng--;
                            zip_copy_dist &= WINDOW_SIZE - 1;
                            zip_wp &= WINDOW_SIZE - 1;
                            buff[off + n++] = windowSlides[zip_wp++] =
                                    windowSlides[zip_copy_dist++];
                        }
                    } else {
                        while (zip_copy_leng > 0 && n < size) {
                            zip_copy_leng--;
                            zip_wp &= WINDOW_SIZE - 1;
                            zip_NEEDBITS(8);
                            buff[off + n++] = windowSlides[zip_wp++] = readBits(8);
                            ignoreBits(8);
                        }
                        if (zip_copy_leng === 0)
                            flateType = -1;
                    }
                    if (n === size)
                        return n;
                }

                if (flateType === -1) {
                    if (isEOF) {
                        break;
                    }
                    zip_NEEDBITS(1);
                    if (readBits(1) !== 0) {
                        isEOF = true;
                    }
                    ignoreBits(1);
                    zip_NEEDBITS(2);
                    flateType = readBits(2);
                    ignoreBits(2);
                    zip_tl = null;
                    zip_copy_leng = 0;
                }
                switch (flateType) {
                    case 0:
                        i = decodeHFCS(buff, off + n, size - n);
                        break;
                    case 1:
                        if (zip_tl) {
                            i = decodeHFC(buff, off + n, size - n);
                        } else {
                            i = decodeHFCF(buff, off + n, size - n);
                        }
                        break;
                    case 2:
                        if (zip_tl) {
                            i = decodeHFC(buff, off + n, size - n);
                        } else {
                            i = decodeHFCD(buff, off + n, size - n);
                        }
                        break;
                    default:
                        i = -1;
                        break;
                }
                if (i === -1) {
                    return (isEOF) ? 0 : -1;
                }
                n += i;
            }
            return n;
        }
    }

    function EcmaAsciiHex() {
        this.decode = function (data) {
            var res = [];
            var prefix = -1;
            var pointer = 0;
            var val, dd;
            var isEOF = false;
            for (var i = 0, ii = data.length; i < ii; i++) {
                val = data[i];
                if (val >= 0x30 && val <= 0x39) {
                    dd = val & 0x0F;
                } else if ((val >= 0x41 && val <= 0x46) || (val >= 0x61 && val <= 0x66)) {
                    dd = (val & 0x0f) + 9;
                } else if (val === 0x3e) {
                    isEOF = true;
                    break;
                } else {
                    continue;
                }
                if (prefix < 0) {
                    prefix = dd;
                } else {
                    res[pointer++] = (prefix << 4) | dd;
                    prefix = -1;
                }
            }
            if (prefix >= 0 && isEOF) {
                res[pointer++] = prefix << 4;
                prefix = -1;
            }
            return res;
        };
    }

    function EcmaAscii85() {
        this.decode = function (data) {
            var n = data.length, r = [], b = [0, 0, 0, 0, 0], j, t, x, w, d;
            for (var i = 0; i < n; ++i) {
                if (data[i] === 0x7a) {
                    r.push(0, 0, 0, 0);
                    continue;
                }
                for (j = 0; j < 5; ++j) {
                    b[j] = data[i + j] - 0x21;
                }
                d = n - i;
                if (d < 5) {
                    for (j = d; j < 4; b[++j] = 0) {
                        //
                    }
                    b[d] = 0x55;
                }
                t = (((b[0] * 85 + b[1]) * 85 + b[2]) * 85 + b[3]) * 85 + b[4];
                x = t & 0xff;
                t >>>= 8;
                w = t & 0xff;
                t >>>= 8;
                r.push(t >>> 8, t & 0xff, w, x);
                for (j = d; j < 5; ++j, r.pop()) {
                    //
                }
                i += 4;
            }
            return r;

        };
    }

    function EcmaRunLength() {
        this.decode = function (data) {
            var len;
            var value;
            var count = data.length;
            var pp = 0;
            var res = [];
            for (var i = 0; i < count; i++) {
                len = data[i];
                if (len < 0) {
                    len = 256 + len;
                }
                if (len === 128) {
                    i = count;
                } else if (len > 128) {
                    i++;
                    len = 257 - len;
                    value = data[i];
                    for (var j = 0; j < len; j++) {
                        res[pp++] = value;
                    }
                } else {
                    i++;
                    len++;
                    for (var j = 0; j < len; j++) {
                        res[pp++] = data[i + j];
                    }
                    i = i + len - 1;
                }
            }
            return res;
        };
    }

    var EcmaKEY = {
        A: "A", AA: "AA", AC: "AC", AcroForm: "AcroForm", ActualText: "ActualText",
        AIS: "AIS", Alternate: "Alternate", AlternateSpace: "AlternateSpace",
        Annot: "Annot", Annots: "Annots", AntiAlias: "AntiAlias", AP: "AP",
        Array: "Array", ArtBox: "ArtBox", AS: "AS", Asset: "Asset", Assets: "Assets",
        Ascent: "Ascent", Author: "Author", AvgWidth: "AvgWidth", B: "B",
        BlackPoint: "BlackPoint", Background: "Background", Base: "Base",
        BaseEncoding: "BaseEncoding", BaseFont: "BaseFont", BaseState: "BaseState",
        BBox: "BBox", BC: "BC", BDC: "BDC", BG: "BG", BI: "BI",
        BitsPerComponent: "BitsPerComponent", BitsPerCoordinate: "BitsPerCoordinate",
        BitsPerFlag: "BitsPerFlag", BitsPerSample: "BitsPerSample", BlackIs1: "BlackIs1",
        BleedBox: "BleedBox", Blend: "Blend", Bounds: "Bounds", Border: "Border",
        BM: "BM", BPC: "BPC", BS: "BS", Btn: "Btn", ByteRange: "ByteRange", C: "C",
        C0: "C0", C1: "C1", C2: "C2", CA: "CA", ca: "ca", Calculate: "Calculate",
        CapHeight: "CapHeight", Caret: "Caret", Category: "Category", Catalog: "Catalog",
        Cert: "Cert", CF: "CF", CFM: "CFM", Ch: "Ch", CIDSet: "CIDSet",
        CIDSystemInfo: "CIDSystemInfo", CharProcs: "CharProcs", CharSet: "CharSet",
        CheckSum: "CheckSum", CIDFontType0C: "CIDFontType0C", CIDToGIDMap: "CIDToGIDMap",
        Circle: "Circle", ClassMap: "ClassMap", CMap: "CMap", CMapName: "CMapName",
        CMYK: "CMYK", CO: "CO", Color: "Color", Colors: "Colors", ColorBurn: "ColorBurn",
        ColorDodge: "ColorDodge", ColorSpace: "ColorSpace", ColorTransform: "ColorTransform",
        Columns: "Columns", Components: "Components", CompressedObject: "CompressedObject",
        Compatible: "Compatible", Configurations: "Configurations", Configs: "Configs",
        ContactInfo: "ContactInfo", Contents: "Contents", Coords: "Coords",
        Count: "Count", CreationDate: "CreationDate", Creator: "Creator",
        CropBox: "CropBox", CS: "CS", CVMRC: "CVMRC", D: "D", DA: "DA",
        DamageRowsBeforeError: "DamageRowsBeforeError", Darken: "Darken", DC: "DC",
        DCT: "DCT", Decode: "Decode", DecodeParms: "DecodeParms", Desc: "Desc",
        DescendantFonts: "DescendantFonts", Descent: "Descent", Dest: "Dest",
        Dests: "Dests", Difference: "Difference", Differences: "Differences",
        Domain: "Domain", DP: "DP", DR: "DR", DS: "DS", DV: "DV", DW: "DW", DW2: "DW2",
        E: "E", EarlyChange: "EarlyChange", EF: "EF", EFF: "EFF",
        EmbeddedFiles: "EmbeddedFiles", EOPROPtype: "EOPROPtype", Encode: "Encode",
        EncodeByteAlign: "EncodeByteAlign", Encoding: "Encoding", Encrypt: "Encrypt",
        EncryptMetadata: "EncryptMetadata", EndOfBlock: "EndOfBlock",
        EndOfLine: "EndOfLine", Exclusion: "Exclusion", Export: "Export",
        Extend: "Extend", Extends: "Extends", ExtGState: "ExtGState", Event: "Event",
        F: "F", FDF: "FDF", Ff: "Ff", Fields: "Fields", FIleAccess: "FIleAccess",
        FileAttachment: "FileAttachment", Filespec: "Filespec", Filter: "Filter",
        First: "First", FirstChar: "FirstChar", FIrstPage: "FIrstPage",
        Fit: "Fit", FItB: "FItB", FitBH: "FitBH", FItBV: "FItBV", FitH: "FitH",
        FItHeight: "FItHeight", FitR: "FitR", FitV: "FitV", FitWidth: "FitWidth",
        Flags: "Flags", Fo: "Fo", Font: "Font", FontBBox: "FontBBox",
        FontDescriptor: "FontDescriptor", FontFamily: "FontFamily", FontFile: "FontFile",
        FontFIle2: "FontFIle2", FontFile3: "FontFile3", FontMatrix: "FontMatrix",
        FontName: "FontName", FontStretch: "FontStretch", FontWeight: "FontWeight",
        Form: "Form", Format: "Format", FormType: "FormType", FreeText: "FreeText",
        FS: "FS", FT: "FT", FullScreen: "FullScreen", Function: "Function",
        Functions: "Functions", FunctionType: "FunctionType", G: "G", Gamma: "Gamma",
        GoBack: "GoBack", GoTo: "GoTo", GoToR: "GoToR", Group: "Group", H: "H",
        HardLight: "HardLight", Height: "Height", Hide: "Hide", Highlight: "Highlight",
        Hue: "Hue", Hival: "Hival", I: "I", ID: "ID", Identity: "Identity",
        Identity_H: "Identity_H", Identity_V: "Identity_V", IDTree: "IDTree", IM: "IM",
        Image: "Image", ImageMask: "ImageMask", Index: "Index", Indexed: "Indexed",
        Info: "Info", Ink: "Ink", InkList: "InkList", Instances: "Instances",
        Intent: "Intent", InvisibleRect: "InvisibleRect", IRT: "IRT", IT: "IT",
        ItalicAngle: "ItalicAngle", JavaScript: "JavaScript", JS: "JS", JT: "JT",
        JBIG2Globals: "JBIG2Globals", K: "K", Keywords: "Keywords", Keystroke: "Keystroke",
        Kids: "Kids", L: "L", Lang: "Lang", Last: "Last", LastChar: "LastChar",
        LastModified: "LastModified", LastPage: "LastPage", Launch: "Launch",
        Layer: "Layer", Leading: "Leading", Length: "Length", Length1: "Length1",
        Length2: "Length2", Length3: "Length3", Lighten: "Lighten", Limits: "Limits",
        Line: "Line", Linearized: "Linearized", LinearizedReader: "LinearizedReader",
        Link: "Link", ListMode: "ListMode", Location: "Location", Lock: "Lock",
        Locked: "Locked", Lookup: "Lookup", Luminosity: "Luminosity", LW: "LW",
        M: "M", MacExpertEncoding: "MacExpertEncoding", MacRomanEncoding: "MacRomanEncoding",
        Margin: "Margin", MarkInfo: "MarkInfo", Mask: "Mask", Matrix: "Matrix",
        Matte: "Matte", max: "max", MaxLen: "MaxLen", MaxWidth: "MaxWidth",
        MCID: "MCID", MediaBox: "MediaBox", Metadata: "Metadata", min: "min",
        MissingWidth: "MissingWidth", MK: "MK", ModDate: "ModDate", MouseDown: "MouseDown",
        MouseEnter: "MouseEnter", MouseExit: "MouseExit", MouseUp: "MouseUp",
        Movie: "Movie", Multiply: "Multiply", N: "N", Name: "Name", Named: "Named",
        Names: "Names", NeedAppearances: "NeedAppearances", Next: "Next",
        NextPage: "NextPage", NM: "NM", None: "None", Normal: "Normal",
        Nums: "Nums", O: "O", ObjStm: "ObjStm", OC: "OC", OCGs: "OCGs",
        OCProperties: "OCProperties",
        OE: "OE", OFF: "OFF", off: "off", ON: "ON", On: "On", OnBlur: "OnBlur",
        OnFocus: "OnFocus", OP: "OP", op: "op", Open: "Open", OpenAction: "OpenAction",
        OPI: "OPI", OPM: "OPM", Opt: "Opt", Order: "Order", Ordering: "Ordering",
        Outlines: "Outlines", Overlay: "Overlay", P: "P", PaintType: "PaintType",
        Page: "Page", PageLabels: "PageLabels", PageMode: "PageMode", Pages: "Pages",
        Params: "Params", Parent: "Parent", ParentTree: "ParentTree", Pattern: "Pattern",
        PatternType: "PatternType", PC: "PC", PDFDocEncoding: "PDFDocEncoding",
        Perms: "Perms", Pg: "Pg", PI: "PI", PieceInfo: "PieceInfo", PO: "PO",
        Polygon: "Polygon", PolyLine: "PolyLine", Popup: "Popup", Predictor: "Predictor",
        Prev: "Prev", PrevPage: "PrevPage", Print: "Print", PrinterMark: "PrinterMark",
        PrintState: "PrintState", Process: "Process", ProcSet: "ProcSet",
        Producer: "Producer", Projection: "Projection", Properties: "Properties",
        PV: "PV", Q: "Q", Qfactor: "Qfactor", QuadPoints: "QuadPoints", R: "R",
        Range: "Range", RBGroups: "RBGroups", RC: "RC", Reason: "Reason",
        Recipients: "Recipients", Rect: "Rect", Reference: "Reference",
        Registry: "Registry", ResetForm: "ResetForm", Resources: "Resources",
        RGB: "RGB", RichMedia: "RichMedia", RichMediaContent: "RichMediaContent",
        RD: "RD", RoleMap: "RoleMap", Root: "Root", Rotate: "Rotate", Rows: "Rows", RT: "RT",
        RV: "RV", S: "S", SA: "SA", Saturation: "Saturation", SaveAs: "SaveAs",
        Screen: "Screen", SetOCGState: "SetOCGState", Shading: "Shading",
        ShadingType: "ShadingType", Sig: "Sig", SigFlags: "SigFlags",
        Signed: "Signed", Size: "Size", SM: "SM", SMask: "SMask", SoftLight: "SoftLight",
        Sound: "Sound", Square: "Square", Squiggly: "Squiggly", Stamp: "Stamp",
        Standard: "Standard", StandardEncoding: "StandardEncoding", State: "State",
        StemH: "StemH", StemV: "StemV", StmF: "StmF", StrF: "StrF", StrikeOut: "StrikeOut",
        StructElem: "StructElem", StructParent: "StructParent",
        StructParents: "StructParents", StructTreeRoot: "StructTreeRoot", Style: "Style",
        SubFilter: "SubFilter", Subj: "Subj", Subject: "Subject", SubmitForm: "SubmitForm",
        Subtype: "Subtype", Supplement: "Supplement", T: "T", Tabs: "Tabs",
        TagSuspect: "TagSuspect", Text: "Text", TI: "TI", TilingType: "TilingType",
        tintTransform: "tintTransform", Title: "Title", TM: "TM", Toggle: "Toggle",
        ToUnicode: "ToUnicode", TP: "TP", TR: "TR", TrapNet: "TrapNet",
        Trapped: "Trapped", TrimBox: "TrimBox", Tx: "Tx", TxFontSize: "TxFontSize",
        TxOutline: "TxOutline", TU: "TU", Type: "Type", U: "U", UE: "UE",
        UF: "UF", Uncompressed: "Uncompressed", Unsigned: "Unsigned", Usage: "Usage",
        V: "V", Validate: "Validate", VerticesPerRow: "VerticesPerRow", View: "View",
        VIewState: "VIewState", VP: "VP", W: "W", W2: "W2", Watermark: "Watermark",
        WhitePoint: "WhitePoint", Widget: "Widget", Win: "Win",
        WinAnsiEncoding: "WinAnsiEncoding", Width: "Width", Widths: "Widths",
        WP: "WP", WS: "WS", X: "X", XFA: "XFA", XFAImages: "XFAImages", XHeight: "XHeight",
        XObject: "XObject", XRef: "XRef", XRefStm: "XRefStm", XStep: "XStep", XYZ: "XYZ",
        YStep: "YStep", Zoom: "Zoom", ZoomTo: "ZoomTo", Unchanged: "Unchanged",
        Underline: "Underline"
    };
    var EcmaLEX = {
        CHAR256: [
//          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, // 0
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
            1, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, // 2
            4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 2, 0, 2, 0, // 3
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, // 5
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, // 7
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 8
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 9
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // A
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // B
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // C
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // D
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // E
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  // F
        ],
        STRPDF: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            728, 711, 710, 729, 733, 731, 730, 732, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8226, 8224, 8225, 8230, 8212,
            8211, 402, 8260, 8249, 8250, 8722, 8240, 8222, 8220, 8221, 8216, 8217,
            8218, 8482, 64257, 64258, 321, 338, 352, 376, 381, 305, 322, 339, 353,
            382, 0, 8364
        ],
        isWhiteSpace: function (ch) {
            return this.CHAR256[ch] === 1;
        },
        isEOL: function (ch) {
            return ch === 0xa || ch === 0xd;
        },
        isDelimiter: function (ch) {
            return this.CHAR256[ch] === 2;
        },
        isComment: function (ch) {
            return ch === 0x25;
        },
        isBacklash: function (ch) {
            return ch === 0x5c;
        },
        isEscSeq: function (ch1, ch2) {
            if (ch1 === 0xfc) {
                switch (ch2) {
                    case 0x28: //(
                    case 0x29: //)
                    case 0x62: //b
                    case 0x66: //f
                    case 0x6e: //n
                    case 0x72: //r
                    case 0x74: //t           
                    case 0x5c: //"/"
                    case 0xc:
                    case 0xd:
                        return true;
                    default :
                        return false;
                }
            }
            return false;
        },
        isDigit: function (ch) {
            return this.CHAR256[ch] === 4;
        },
        isBoolean: function (x) {
            return typeof x === 'boolean';
        },
        isNull: function (x) {
            return typeof x === null;
        },
        isNumber: function (x) {
            return typeof x === 'number';
        },
        isString: function (x) {
            return typeof x === 'string';
        },
        isHexString: function (x) {
            return x instanceof EcmaHEX;
        },
        isArray: function (x) {
            return x instanceof Array;
        },
        isName: function (x) {
            return x instanceof EcmaNAME;
        },
        isDict: function (x) {
            return x instanceof EcmaDICT;
        },
        isRef: function (x) {
            return x instanceof EcmaOREF;
        },
        isStreamDict: function (dictObj) {
            return EcmaKEY.Length in dictObj.keys;
        },
        getDA: function (str) {
            var obj = {fontSize: 10, fontName: "Arial", fontColor: "0 g"};
            var ii = str.length;
            var i = 0;
            var ss = "";
            var dd = new Array();
            while (i < ii) {
                var cc = str.charCodeAt(i++);
                if (EcmaLEX.isWhiteSpace(cc) || EcmaLEX.isEOL(cc)) {
                    if (ss.length > 0) {
                        dd.push(ss);
                    }
                    ss = "";
                } else {
                    ss = ss + String.fromCharCode(cc);
                }
            }
            if (ss.length > 0) {
                dd.push(ss);
            }
            for (var i = 0, ii = dd.length; i < ii; i++) {
                if (dd[i].charAt(0) === '/') {
                    obj.fontName = dd[i].substring(1);
                    if (dd[i + 1]) {
                        obj.fontSize = parseInt(dd[i + 1]);
                    }
                } else if (i > 3 && dd[i] === "rg") {
                    obj.fontColor = dd[i - 3] + " " + dd[i - 2] + " " + dd[i - 1] + " rg";
                }
            }
            return obj;
        },
        getRefFromString: function (str) {
            var strs = str.trim().split(' ');
            return new EcmaOREF(parseInt(strs[0]), parseInt(strs[1]));
        },
        getZeroLead: function (num) {
            var numStr = "" + num;
            var balance = 10 - numStr.length;
            for (var i = 0; i < balance; i++) {
                numStr = "0" + numStr;
            }
            return numStr;
        },
        toPDFString: function (str) {
            var n = str.length;
            var buf = [];
            var t;
            if (str[0] === '\xFE' && str[1] === '\xFF') {
                for (var i = 2; i < n; i += 2) {
                    t = (str.charCodeAt(i) << 8) | str.charCodeAt(i + 1);
                    buf.push(String.fromCharCode(t));
                }
            } else {
                for (var i = 0; i < n; ++i) {
                    var code = this.STRPDF[str.charCodeAt(i)];
                    buf.push(code ? String.fromCharCode(code) : str.charAt(i));
                }
            }
            return buf.join('');
        },
        toPDFHex16String: function (str) {
            var n = str.length;
            var buf = [];
            var t;
            buf.push("fe");
            buf.push("ff");
            for (var i = 0; i < n; ++i) {
                t = str.charCodeAt(i);
                var hex = Number(t >> 8).toString(16);
                while (hex.length < 2) {
                    hex = "0" + hex;
                }
                var hex2 = Number(t & 0xff).toString(16);
                while (hex2.length < 2) {
                    hex2 = "0" + hex2;
                }
                buf.push(hex);
                buf.push(hex2);
            }
            return buf.join('');
        },
        toBytes32: function (num) {
            return [(num & 0xff000000) >> 24, (num & 0xff0000) >> 16,
                (num & 0xff00) >> 8, (num & 0xff)];
        },
        textToBytes: function (str) {
//		var utf8 = [];
//		for (var i = 0; i < str.length; i++) {
//			var charcode = str.charCodeAt(i);
//			if (charcode < 0x80)
//				utf8.push(charcode);
//			else if (charcode < 0x800) {
//				utf8.push(0xc0 | (charcode >> 6),
//						0x80 | (charcode & 0x3f));
//			} else if (charcode < 0xd800 || charcode >= 0xe000) {
//				utf8.push(0xe0 | (charcode >> 12),
//						0x80 | ((charcode >> 6) & 0x3f),
//						0x80 | (charcode & 0x3f));
//			} else {
//				// let's keep things simple and only handle chars up to U+FFFF...
//				utf8.push(0xef, 0xbf, 0xbd); // U+FFFE "replacement character"
//			}
//		}
//		return utf8;

            var arr = [];
            var cc;
            for (var i = 0, ii = str.length; i < ii; i++) {
                cc = str.charCodeAt(i);
                if (cc < 256) {
                    arr.push(cc);
                } else {
                    arr.push(cc >> 8);
                    arr.push(cc & 0xff);
                }
            }
            return arr;
        },
        bytesToText: function (data, offset, len) {
            var str = "";
            for (var i = offset; i < len; i++) {
                str += String.fromCharCode(data[offset + i]);
            }
            return str;
        },
        pushBytesToBuffer: function (data, buffer) {
            for (var i = 0, ii = data.length; i < ii; i++) {
                buffer.push(data[i]);
            }
        },
        objectToText: function (obj) {
            if (this.isDict(obj)) {
                var str = "<<";
                for (var nn in obj.keys) {
                    str += "/" + nn + " " + this.objectToText(obj.keys[nn]) + " ";
                }
                str += ">>";
                return str;
            } else if (this.isArray(obj)) {
                var str = "[";
                for (var i = 0, ii = obj.length; i < ii; i++) {
                    str += " " + this.objectToText(obj[i]);
                }
                str += "]";
                return str;
            } else if (this.isRef(obj)) {
                return obj.ref;
            } else if (this.isName(obj)) {
                return "/" + obj.name;
            } else if (this.isNumber(obj)) {
                return "" + obj;
            } else if (this.isString(obj)) {
                return "(" + EcmaLEX.toPDFString(obj) + ")";
            } else if (this.isHexString(obj)) {
                return obj.str;
            } else if (this.isBoolean(obj)) {
                if (obj) {
                    return "true";
                } else {
                    return "false";
                }
            }
            return "null";
        }
    };
    var EcmaFontWidths = {
        Arial: [
            750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750,
            750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750,
            750, 750, 750, 750, 278, 278, 355, 556, 556, 889, 667, 191, 333, 333,
            389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556,
            556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667,
            611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667,
            611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556,
            556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
            556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334,
            584, 350, 556, 350, 222, 556, 333, 1000, 556, 556, 333, 1000, 667, 333,
            1000, 350, 611, 350, 350, 222, 222, 333, 333, 350, 556, 1000, 333, 1000,
            500, 333, 944, 350, 500, 667, 278, 333, 556, 556, 556, 556, 260, 556,
            333, 737, 370, 556, 584, 333, 737, 552, 400, 549, 333, 333, 333, 576,
            537, 333, 333, 333, 365, 556, 834, 834, 834, 611, 667, 667, 667, 667,
            667, 667, 1000, 722, 667, 667, 667, 667, 278, 278, 278, 278, 722, 722,
            778, 778, 778, 778, 778, 584, 778, 722, 722, 722, 722, 667, 667, 611,
            556, 556, 556, 556, 556, 556, 889, 500, 556, 556, 556, 556, 278, 278,
            278, 278, 556, 556, 556, 556, 556, 556, 556, 549, 611, 556, 556, 556,
            556, 500, 556, 500
        ]
    };
    var EcmaFormField = {
        READONLY_ID: 1,
        REQUIRED_ID: 2,
        NOEXPORT_ID: 3,
        MULTILINE_ID: 13,
        PASSWORD_ID: 14,
        NOTOGGLETOOFF_ID: 15,
        RADIO_ID: 16,
        PUSHBUTTON_ID: 17,
        COMBO_ID: 18,
        EDIT_ID: 19,
        SORT_ID: 20,
        FILESELECT_ID: 21,
        MULTISELECT_ID: 22,
        DONOTSPELLCHECK_ID: 23,
        DONOTSCROLL_ID: 24,
        COMB_ID: 25,
        RICHTEXT_ID: 26,
        RADIOINUNISON_ID: 26,
        COMMITONSELCHANGE_ID: 27,
        handleDisplayChange: function(fieldDict, field, flags) {
            var fArr = this.flagToBooleans(flags);
            switch (field.display) {
                case display.hidden:
                    fArr[2] = true;
                    fArr[3] = true;
                    fArr[6] = false;
                    break;
                case display.noPrint:
                    fArr[2] = false;
                    fArr[3] = false;
                    fArr[6] = false;
                    break;
                case display.noView:
                    fArr[2] = false;
                    fArr[3] = true;
                    fArr[6] = true;
                case display.visible:
                    fArr[2] = false;
                    fArr[3] = true;
                    fArr[6] = false;
                    break;
            }
            fieldDict.keys[EcmaKEY.F] = this.booleansToFlag(fArr);
        },
        editTextField: function (buff, fieldDicts, fieldRefs, fieldDict, fieldText, maxUsed) {
            var isPassword = false;
            var isMulti = false;
            var appearText = fieldText;

            var ff = fieldDict.keys[EcmaKEY.Ff];
            if (ff) {
                var fArr = this.flagToBooleans(ff);
                fArr [1] = true;
                isPassword = fArr[this.PASSWORD_ID];
                if (isPassword) {
                    var temp = "";
                    for (var i = 0, ii = appearText.length; i < ii; i++) {
                        temp += "*";
                    }
                    appearText = temp;
                }
                isMulti = fArr[this.MULTILINE_ID];
            }
            fieldDict.keys[EcmaKEY.V] = fieldText;
            fieldDict.keys[EcmaKEY.AP] = new EcmaDICT();
            if (fieldDict.keys[EcmaKEY.TU]) { // HTML-3445
                var tu = fieldDict.keys[EcmaKEY.TU];
                 if (!EcmaLEX.isHexString(tu)) { // HTML-3674
                    tu = tu.replace(/[{()}]/g, '_');
                    fieldDict.keys[EcmaKEY.TU] = tu;
                 }
            }
            var Q = 0;
            if (fieldDict.keys[EcmaKEY.Q]) {
                Q = fieldDict.keys[EcmaKEY.Q];
            }
            var rect = fieldDict.keys[EcmaKEY.Rect];
            var fw = rect[2] - rect[0];
            fw = Math.round(fw * 100) / 100;
            var fh = rect[3] - rect[1];
            fh = Math.round(fh * 100) / 100;
            var fontSize = 10;
            var daStr = fieldDict.keys["DA"];
            var parent = fieldDict.keys[EcmaKEY.Parent];
            if (EcmaLEX.isRef(parent)) {
                var temp = new EcmaBuffer();
                var parD = temp.getIndirectObject(parent);
                if (EcmaLEX.isDict(parD)) {
                    parD.keys[EcmaKEY.V] = fieldText;
                    fieldDicts.push(parD);
                    fieldRefs.push(parent);
                }
            }
            var fColor = "0 g";
            var fontName = "Arial";
            if (daStr) {
                var daObj = (EcmaLEX.getDA(daStr));
                fontSize = daObj.fontSize;
                fontSize = fontSize === 0 ? 10 : fontSize;
                fColor = daObj.fontColor;
                fontName = daObj.fontName;
//            fieldDict.keys["DA"] = "/Arial " + fontSize + " Tf " + fColor;
            }
            var nDict = new EcmaDICT();
            var nDictRef = new EcmaOREF(maxUsed, 0);

            var nRef = fieldDict.keys[EcmaKEY.AP].keys["N"];
            if (nRef) {
                var nDict = buff.getObjectValue(nRef);
            }


            fieldDict.keys[EcmaKEY.AP].keys["N"] = nDictRef;
            nDict.keys[EcmaKEY.BBox] = [0, 0, fw, fh];
            nDict.keys[EcmaKEY.Matrix] = [1, 0, 0, 1, 0, 0];
            nDict.keys[EcmaKEY.Subtype] = new EcmaNAME(EcmaKEY.Form);
            var resourceDict = new EcmaDICT();
            var fontDict = new EcmaDICT();
            fontDict.keys[EcmaKEY.Name] = new EcmaNAME("Helv");
            fontDict.keys[EcmaKEY.Type] = new EcmaNAME("Font");
            fontDict.keys[EcmaKEY.Subtype] = new EcmaNAME("Type1");
            fontDict.keys[EcmaKEY.BaseFont] = new EcmaNAME("Helvetica");
            fontDict.keys[EcmaKEY.Encoding] = new EcmaNAME("PDFDocEncoding");

            var fontDictHolder = new EcmaDICT();
            fontDictHolder.keys["Helv"] = fontDict;
            resourceDict.keys[EcmaKEY.Font] = fontDictHolder;

            nDict.keys[EcmaKEY.Resources] = resourceDict;
            nDict.keys[EcmaKEY.FormType] = 1;
            nDict.keys[EcmaKEY.Type] = new EcmaNAME(EcmaKEY.XObject);
            var nStr = "";
            if (isMulti) {
                var temp, curW = 0, output = "", curWord = "", curLine = "";
                for (var i = 0, ii = appearText.length; i < ii; i++) {
                    var cc = appearText.charCodeAt(i);
                    var ch = String.fromCharCode(cc);
                    var cw = this.findCodeWidth(cc, fontSize);
                    if ((curW + cw) > fw) {
                        if (curWord === curLine) {
                            output += curWord + "\n";
                            curWord = "";
                            curLine = "";
                            curW = 0;
                        } else {
                            output += "\n";
                            curW = this.findStringWidth(curWord, fontSize);
                            curLine = curWord;
                        }
                    }
                    curW += cw;
                    if (cc === 0xa) {
                        output += curWord + "\n";
                        curWord = "";
                        curLine = "";
                        curW = 0;
                    } else if (EcmaLEX.isWhiteSpace(cc)) {
                        output += curWord + " ";
                        curWord = "";
                        curLine += " ";
                    } else {
                        curWord += ch;
                        curLine += ch;
                    }
                }
                if (curWord.length > 0) {
                    output += curWord;
                }
                var outputs = output.split("\n");
                var lineH = fontSize * 1.2;
                lineH = Math.round(lineH * 100) / 100;
                var paraH = outputs.length * lineH;
                var startY = (fh - paraH) + paraH - fontSize;
                startY = startY < 0 ? 0 : startY;
                if (startY > 0) {
                    startY = Math.round(startY * 100) / 100;
                }
                nStr += "/Tx BMC\nBT\n" + fColor + "\n/Helv " + fontSize + " Tf\n"; //prefix
                nStr += "2 " + startY + " Td\n(" + outputs[0] + ") Tj\n";
                for (var i = 1, ii = outputs.length; i < ii; i++) {
                    nStr += "0 " + (-lineH) + " Td\n(" + outputs[i] + ") Tj\n";
                }
                nStr += "ET\nEMC"; //suffix
                var nBytes = EcmaLEX.textToBytes(nStr);
                nDict.keys[EcmaKEY.Length] = nBytes.length;
                nDict.rawStream = nBytes;
                nDict.stream = nBytes;

                fieldDicts.push(nDict);
                fieldRefs.push(nDictRef);

            } else {
                var desc = (fontSize - fontSize * 0.2); //0.2 is baseline percentage
                var ty = (fh - desc) > 0 ? (fh - desc) / 2 : 0;
                var tx = 2;
                if (Q > 0) {
                    var cc, ch, tw = 0;
                    tx = 0;
                    for (var i = 0, ii = appearText.length; i < ii; i++) {
                        cc = appearText.charCodeAt(i);
                        ch = String.fromCharCode(cc);
                        tw += this.findCodeWidth(cc, fontSize);
                    }
                    if (tw < fw) {
                        if (Q === 1) {
                            tx = (fw - tw) / 2;
                        } else {
                            tx = (fw - tw);
                        }
                    }
                }
                var nBytes = [];
                var prefix = "/Tx BMC\nBT\n" + fColor + "\n" + tx + " " + ty
                        + " Td\n/Helv" + " " + fontSize + " Tf\n(";
                var suffix = ") Tj\nET\nEMC";
                var temp = EcmaLEX.textToBytes(prefix);
                for (var i = 0, ii = temp.length; i < ii; i++) {
                    nBytes.push(temp[i]);
                }
                temp = EcmaLEX.textToBytes(appearText);
                for (var i = 0, ii = temp.length; i < ii; i++) {
                    nBytes.push(temp[i]);
                }
                temp = EcmaLEX.textToBytes(suffix);
                for (var i = 0, ii = temp.length; i < ii; i++) {
                    nBytes.push(temp[i]);
                }
                nDict.keys[EcmaKEY.Length] = nBytes.length;
                nDict.rawStream = nBytes;
                nDict.stream = nBytes;

                fieldDicts.push(nDict);
                fieldRefs.push(nDictRef);
            }


        },
        selectCheckBox: function (curSelect, fieldDict) {
            var onVal = "Yes";
            var offVal = "Off";
            var ap = fieldDict.keys[EcmaKEY.AP];
            if (ap) {
                ap = new EcmaBuffer().getObjectValue(ap);
                var d = ap.keys[EcmaKEY.D];
                if (d) {
                    d = new EcmaBuffer().getObjectValue(d);
                    for (var dk  in d.keys) {
                        var lc = dk.toLowerCase();
                        if (lc !== "off") {
                            onVal = dk;
                        }
                    }
                }
                if (curSelect) {
                    fieldDict.keys[EcmaKEY.AS] = new EcmaNAME(onVal);
                    fieldDict.keys[EcmaKEY.V] = new EcmaNAME(onVal);
                } else {
                    fieldDict.keys[EcmaKEY.AS] = new EcmaNAME(offVal);
                    fieldDict.keys[EcmaKEY.V] = new EcmaNAME(offVal);
                }
            }
        },
        selectRadioChild: function (radioButton, fieldDict) {
            var ap = fieldDict.keys[EcmaKEY.AP];
            if (ap) {
                ap = new EcmaBuffer().getObjectValue(ap);
                var onVal = "Yes";
                var offVal = "Off";
                var d = ap.keys[EcmaKEY.D];
                if (d) {
                    d = new EcmaBuffer().getObjectValue(d);
                    for (var dk  in d.keys) {
                        if (dk.toLowerCase() !== "off") {
                            if (radioButton.value != dk) {
                                onVal = radioButton.value;
                                this.handleAPNameChange(ap, radioButton.value);
                            } else {
                                onVal = dk;
                            }
                        }
                    }
                }
                if (radioButton.checked) {
                    fieldDict.keys[EcmaKEY.AS] = new EcmaNAME(onVal);
                } else {
                    fieldDict.keys[EcmaKEY.AS] = new EcmaNAME(offVal);
                }
            }
        },
        handleAPNameChange: function(ap, rbValue) {
            var d = ap.keys[EcmaKEY.D];
            if (d) {
                d = new EcmaBuffer().getObjectValue(d);
                for (var dk  in d.keys) {
                    if (dk.toLowerCase() !== "off" && rbValue != dk) {
                        d.keys[rbValue] = d.keys[dk];
                        delete d.keys[dk];
                    }
                }
            }
            var n = ap.keys[EcmaKEY.N];
            if (n) {
                n = new EcmaBuffer().getObjectValue(n);
                for (var nk  in n.keys) {
                    if (nk.toLowerCase() !== "off" && rbValue != nk) {
                        n.keys[rbValue] = n.keys[nk];
                        delete n.keys[nk];
                    }
                }
            }
            var r = ap.keys[EcmaKEY.R];
            if (r) {
                r = new EcmaBuffer().getObjectValue(r);
                for (var rk  in r.keys) {
                    if (rk.toLowerCase() !== "off" && rbValue != rk) {
                        r.keys[rbValue] = r.keys[rk];
                        delete r.keys[rk];
                    }
                }
            }
        },
        selectChoice: function (fieldDicts, fieldRefs, fieldDict, curValue, maxUsed) {

            var opt = fieldDict.keys[EcmaKEY.Opt];
            var appearText = curValue;
            fieldDict.keys[EcmaKEY.V] = curValue;

            if (opt) {
                for (var i = 0, ii = opt.length; i < ii; i++) {
                    var tt = opt[i];
                    if (EcmaLEX.isArray(tt)) {
                        if (tt[0] === curValue) {
                            appearText = tt[1];
                            fieldDict.keys[EcmaKEY.I] = [i];
                            break;
                        }
                    } else {
                        if (tt === curValue) {
                            appearText = tt;
                            fieldDict.keys[EcmaKEY.I] = [i];
                            break;
                        }
                    }
                }
            }

            fieldDict.keys[EcmaKEY.AP] = new EcmaDICT();
            var rect = fieldDict.keys[EcmaKEY.Rect];
            var fw = rect[2] - rect[0];
            var fh = rect[3] - rect[1];
            var fontSize = 10;
            var daStr = fieldDict.keys["DA"];
            if (daStr) {
                var ptr = daStr.indexOf("/");
                if (ptr >= 0) {
                    daStr = daStr.substring(ptr).split(' ');
                    fontSize = parseInt(daStr[1]);
                }
                fieldDict.keys["DA"] = "/Arial " + fontSize + " Tf";
            }
            var nDict = new EcmaDICT();
            var nDictRef = new EcmaOREF(maxUsed, 0);

            fieldDict.keys[EcmaKEY.AP].keys["N"] = nDictRef;
            nDict.keys[EcmaKEY.BBox] = [0, 0, fw, fh];
            nDict.keys[EcmaKEY.Matrix] = [1, 0, 0, 1, 0, 0];
            nDict.keys[EcmaKEY.Subtype] = new EcmaNAME(EcmaKEY.Form);
            nDict.keys[EcmaKEY.Resources] = new EcmaDICT();
            nDict.keys[EcmaKEY.FormType] = 1;
            nDict.keys[EcmaKEY.Type] = new EcmaNAME(EcmaKEY.XObject);

            var desc = (fontSize - fontSize * 0.2); //0.2 is baseline percentage
            var mid = (fh - desc) > 0 ? (fh - desc) / 2 : 0;
            var nStr = "/Tx BMC\nBT\n/Arial " + fontSize
                    + " Tf\n0 g\n2 " + mid + " Td\n(" + appearText + ") Tj\nET\nEMC";

            var nBytes = EcmaLEX.textToBytes(nStr);
            nDict.keys[EcmaKEY.Length] = nBytes.length;
            nDict.rawStream = nBytes;
            nDict.stream = nBytes;

            fieldDicts.push(nDict);
            fieldRefs.push(nDictRef);
        },
        findStringWidth: function (str, fontSize) {
            var tw = 0;
            for (var i = 0, ii = str.length; i < ii; i++) {
                var ch = str.charCodeAt(i);
                if (ch < 256) {
                    tw += EcmaFontWidths.Arial[ch] / 1000 * fontSize;
                } else {
                    tw += fontSize;
                }
            }
            return tw;
        },
        findCodeWidth: function (charCode, fontSize) {
            return charCode < 256 ? (EcmaFontWidths.Arial[charCode] / 1000 * fontSize) : fontSize;
        },
        flagToBooleans: function (flag) {
            var bools = [false];
            for (var i = 0; i < 32; i++) {
                bools[i + 1] = (flag & (1 << i)) === (1 << i);
            }
            return bools;
        },
        booleansToFlag: function (bools) {
            var res = 0;
            for (var i = 0; i < 32; i++) {
                res = (bools[32 - i]) ? (res << 1) | 1 : res = res << 1;
            }
            return res;
        },
        hexEncodeName: function (name) {
            var encoded = '';
            for (var i = 0; i < name.length; i++) {
                var charCode = name.charCodeAt(i);
                if (charCode < 33 || charCode > 126 || name[i] === '"' || name[i] === '#' || name[i] === '/') {
                    encoded += charCode.toString(16);
                } else {
                    encoded += name[i];
                }
            }
            return encoded;
        },
        hexDecodeName: function (name) {
            var decoded = '';
            for (var i = 0; i < name.length; i++) {
                var charCode = name.charCodeAt(i);
                if (name[i] === '#' && (i + 2) < name.length) {
                    var dec = parseInt(name[i + 1] + name[i + 2], 16);
                    decoded += String.fromCharCode(dec);
                    i += 2;
                } else if (charCode >= 33 || charCode <= 126) {
                    decoded += name[i];
                }
            }
            return decoded;
        }
    };
    var EcmaNAMES = {};
    var EcmaOBJECTOFFSETS = {};
    var EcmaPageOffsets = [];
    var EcmaFieldOffsets = [];
    var EcmaMainCatalog = null;
    var EcmaMainData = [];
    var EcmaXRefType = 0; //zero for old and 1 for stream;

    function showEcmaParserError(e) {
        alert(e);
    }
    function EcmaOBJOFF(offset, data, isStream) {
        this.data = data;
        this.offset = offset;
        this.isStream = isStream;
    }
    function EcmaDICT() {
        this.keys = {};
        this.stream = null;
        this.rawStream = null;
    }
    function EcmaNAME(name) {
        this.name = name;
        this.value = null;
    }
    function EcmaOREF(r1, r2) {
        this.num = r1;
        this.gen = r2;
        this.ref = r1 + " " + r2 + " R";
    }
    function EcmaHEX(str) {
        this.str = str;
    }
    function EcmaBuffer(data) {
        this.data = data;
        this.pos = 0;
        this.markPos = 0;
        this.length = 0;
        if (data) {
            this.length = data.length;
        }
    }
    EcmaBuffer.prototype.getByte = function () {
        return (this.pos >= this.length) ? -1 : this.data[this.pos++];
    };
    EcmaBuffer.prototype.mark = function () {
        this.markPos = this.pos;
    };
    EcmaBuffer.prototype.reset = function () {
        this.pos = this.markPos;
    };
    EcmaBuffer.prototype.movePos = function (x) {
        this.pos = x;
    };
    EcmaBuffer.prototype.readTo = function (bb) {
        var avail = this.length - this.pos;
        var max = Math.min(bb.length, avail);
        for (var i = 0; i < max; i++) {
            bb[i] = this.getByte();
        }
    };
    EcmaBuffer.prototype.readTo = function (bb, offset, len) {
        if (this.pos < this.length) {
            var n = 0;
            var avail = this.length - this.pos;
            var max = Math.min(len, avail);
            for (var i = 0; i < max; i++) {
                bb[offset + i] = this.getByte();
                n++;
            }
            return n;
        } else {
            return -1;
        }
    };
    EcmaBuffer.prototype.lookNext = function () {
        return (this.pos >= this.length) ? -1 : this.data[this.pos];
    };
    EcmaBuffer.prototype.lookNextNext = function () {
        return (this.pos >= this.length) ? -1 : this.data[this.pos + 1];
    };
    EcmaBuffer.prototype.getNextLine = function () {
        var bb = "";
        var v = this.getByte();
        while (true) {
            if (v === 0xd) {
                if (bb.endsWith(' ')) {
                    break;
                } else {
                    v = this.getByte();
                    if (v === 0xa) {
                        break;
                    }
                }
            } else if (v === 0xa) {
                break;
            } else {
                bb += String.fromCharCode(v);
                v = this.getByte();
            }
        }
        return bb;
    };
    EcmaBuffer.prototype.skipLine = function () {
        var v = this.getByte();
        while (true) {
            if (v === -1) {
                break;
            } else if (v === 0xd) {
                v = this.lookNext();
                if (v === 0xa) {
                    this.getByte();
                    break;
                }
                break;
            } else if (v === 0xa) {
                break;
            } else {
                v = this.getByte();
            }
        }
    };
    EcmaBuffer.prototype.getNumberValue = function () {
        var v = this.getByte();
        var multi = 1;
        var startFloat = false;
        if (v === 0x2b) { //+
            v = this.getByte();
        } else if (v === 0x2d) { //-
            multi = -1;
            v = this.getByte();
        }
        if (v === 0x2e) { //.
            startFloat = true;
            v = this.getByte();
        }
        if (v < 0x30 || v > 0x39) {
            return 0;
        }
        var numStr = "" + String.fromCharCode(v);
        while (true) {
            var n = this.lookNext();
            if (n === 0x2e || EcmaLEX.isDigit(n)) {
                v = this.getByte();
                numStr += ("" + String.fromCharCode(v));
            } else {
                break;
            }
        }
        if (startFloat) {
            return multi * parseFloat("0." + numStr);
        } else if (numStr.indexOf(".") !== -1) {
            return multi * parseFloat(numStr);
        } else {
            return multi * parseInt(numStr);
        }
    };
    EcmaBuffer.prototype.getNameValue = function () {
        var nameStr = "";
        this.getByte(); //read / first;
        var n;
        while (true) {
            n = this.lookNext();
            if (n >= 0 && !EcmaLEX.isDelimiter(n) && !EcmaLEX.isWhiteSpace(n)) {
                nameStr += String.fromCharCode(this.getByte());
            } else {
                break;
            }
        }
        return nameStr;
    };
    EcmaBuffer.prototype.getNormalString = function () {
        var bb = [];
        this.getByte(); //read ( first;
        var pCount = 1;
        var v = this.getByte();
        var finished = false;
        while (true) {
            var isBuffering = false;
            switch (v) {
                case - 1:
                    finished = true;
                    break;
                case 0x28:
                    bb.push('(');
                    pCount++;
                    break;
                case 0x29:
                    pCount--;
                    if (pCount) {
                        bb.push(')');
                    } else {
                        finished = true;
                    }
                    break;
                case 0x5c:
                    v = this.getByte();
                    switch (v) {
                        case - 1:
                            finished = true;
                            break;
                        case 0x28:
                        case 0x29:
                        case 0x5C:
                            bb.push(String.fromCharCode(v));
                            break;
                        case 0x6E:
                            bb.push('\n');
                            break;
                        case 0x72:
                            bb.push('\r');
                            break;
                        case 0x74:
                            bb.push('\t');
                            break;
                        case 0x62:
                            bb.push('\b');
                            break;
                        case 0x66:
                            bb.push('\f');
                            break;
                        case 0x30:
                        case 0x31:
                        case 0x32:
                        case 0x33:
                        case 0x34:
                        case 0x35:
                        case 0x36:
                        case 0x37:
                            var x = v & 0x0F;
                            v = this.getByte();
                            isBuffering = true;
                            if (v >= 0x30 && v <= 0x37) {
                                x = (x << 3) + (v & 0x0F);
                                v = this.getByte();
                                if (v >= 0x30 && v <= 0x37) {
                                    isBuffering = false;
                                    x = (x << 3) + (v & 0x0F);
                                }
                            }
                            bb.push(String.fromCharCode(x));
                            break;
                        case 0x0D:
                            if (this.lookNext() === 0x0A) {
                                this.getByte();
                            }
                            break;
                        case 0x0A:
                            break;
                        default:
                            bb.push(String.fromCharCode(v));
                            break;
                    }
                    break;
                default:
                    bb.push(String.fromCharCode(v));
            }
            if (finished) {
                break;
            }
            if (!isBuffering) {
                v = this.getByte();
            }
        }
        return bb.join('');
    };
    EcmaBuffer.prototype.getHexString = function () {
        this.getByte(); //read <
        var ch = this.getByte();
        var hexStr = "<";
        while (true) {
            if (ch < 0 || ch === 0x3e) {
                hexStr += ">";
                break;
            } else if (EcmaLEX.isWhiteSpace(ch)) {
                ch = this.getByte();
                continue;
            } else {
                hexStr += String.fromCharCode(ch);
                ch = this.getByte();
            }
        }
        return new EcmaHEX(hexStr);
    };
    EcmaBuffer.prototype.getDictionary = function () {
        var dictObj = new EcmaDICT();
        this.getByte(); //read <
        this.getByte(); //read < again
        var nameBuf = [];
        var canRead = true;
        while (canRead) {
            var n = this.lookNext();
            switch (n) {
                case - 1:
                    return dictObj;
                case 0x30:
                case 0x31:
                case 0x32:
                case 0x33:
                case 0x34:
                case 0x35:
                case 0x36:
                case 0x37:
                case 0x38:
                case 0x39:
                case 0x2b:
                case 0x2d:
                case 0x2e:
                    var n1 = this.getNumberValue();
                    var sp = this.lookNext();
                    var n2 = this.lookNextNext();
                    if (nameBuf.length > 0) {
                        var k = nameBuf.pop();
                        var key = k.name;
                        if (EcmaLEX.isWhiteSpace(sp) && EcmaLEX.isDigit(n2)) {
                            this.getByte(); //space
                            n2 = this.getNumberValue();
                            this.getByte(); //space
                            this.getByte(); //R
                            dictObj.keys[key] = new EcmaOREF(n1, n2);
                        } else {
                            dictObj.keys[key] = (n1);
                        }
                    }
                    break;
                case 0x2f: //now read the name
                    var str = this.getNameValue();
                    var en;
                    if (EcmaNAMES[str]) {
                        en = EcmaNAMES[str];
                    } else {
                        en = new EcmaNAME(str);
                        EcmaNAMES[str] = en;
                    }
                    if (nameBuf.length === 0) {
                        nameBuf.push(en);
                    } else {
                        var k = nameBuf.pop();
                        var key = k.name;
                        dictObj.keys[key] = en;
                    }
                    break;
                case 0x28:
                    var nStr = this.getNormalString();
                    if (nameBuf.length !== 0) {
                        var k = nameBuf.pop();
                        var key = k.name;
                        dictObj.keys[key] = nStr;
                    }
                    break;
                case 0x3c:
                    if (this.lookNextNext() === 0x3c) {
                        var dict = this.getDictionary();
                        if (nameBuf.length !== 0) {
                            var k = nameBuf.pop();
                            var key = k.name;
                            dictObj.keys[key] = dict;
                        }
                    } else {
                        var hStr = this.getHexString();
                        if (nameBuf.length !== 0) {
                            var k = nameBuf.pop();
                            var key = k.name;
                            dictObj.keys[key] = hStr;
                        }
                    }
                    break;
                case 0x5b:
                    var arr = this.getArray();
                    if (nameBuf.length !== 0) {
                        var k = nameBuf.pop();
                        var key = k.name;
                        dictObj.keys[key] = arr;
                    }
                    break;
                case 0x74: // below is true;
                    if (this.data[this.pos + 1] === 0x72 && this.data[this.pos + 2] === 0x75
                            && this.data[this.pos + 3] === 0x65) {
                        for (var i = 0; i < 4; i++) {
                            this.getByte();
                        }
                        if (nameBuf.length > 0) {
                            var k = nameBuf.pop();
                            var key = k.name;
                            dictObj.keys[key] = true;
                        }
                    } else {
                        this.getByte();
                    }
                    break;
                case 0x66: // below is false;
                    if (this.data[this.pos + 1] === 0x61 && this.data[this.pos + 2] === 0x6c
                            && this.data[this.pos + 3] === 0x73 && this.data[this.pos + 4] === 0x65) {
                        for (var i = 0; i < 5; i++) {
                            this.getByte();
                        }
                        if (nameBuf.length > 0) {
                            var k = nameBuf.pop();
                            var key = k.name;
                            dictObj.keys[key] = false;
                        }
                    } else {
                        this.getByte();
                    }
                    break;
                case 0x6e://below is null
                    if (this.data[this.pos + 1] === 0x75 && this.data[this.pos + 2] === 0x6c
                            && this.data[this.pos + 3] === 0x6c) {
                        for (var i = 0; i < 4; i++) {
                            this.getByte();
                        }
                        if (nameBuf.length > 0) {
                            var k = nameBuf.pop();
                            var key = k.name;
                            dictObj.keys[key] = null;
                        }
                    } else {
                        this.getByte();
                    }
                    break;
                case 0x3e:
                    this.getByte();
                    if (this.lookNext() === 0x3e) { //end of dictionary
                        this.getByte();
                        canRead = false;
                    }
                    break;
                default:
                    this.getByte();
                    break;
            }
        }
        if (EcmaLEX.isStreamDict(dictObj) && !dictObj.stream) {
            dictObj.rawStream = this.getRawStream(dictObj);
        }
        return dictObj;
    };
    EcmaBuffer.prototype.getArray = function () {
        this.getByte(); //read and ignore [
        var res = [];
        while (true) {
            var n = this.lookNext();
            switch (n) {
                case - 1:
                    return res;
                case 0x30:
                case 0x31:
                case 0x32:
                case 0x33:
                case 0x34:
                case 0x35:
                case 0x36:
                case 0x37:
                case 0x38:
                case 0x39:
                case 0x2b:
                case 0x2d:
                case 0x2e:
                    var n1 = this.getNumberValue();
                    var sp = this.data[this.pos]; //could be space
                    var n2 = this.data[this.pos + 1]; //could be digit
                    if (EcmaLEX.isWhiteSpace(sp) && EcmaLEX.isDigit(n2)) {
                        this.mark();
                        this.getByte(); //space
                        n2 = this.getNumberValue();
                        this.getByte(); //space
                        var n3 = this.getByte(); //R
                        var n4 = this.lookNext(); //any whitespace or delimiter
                        if (n3 === 0x52 && (EcmaLEX.isWhiteSpace(n4) || EcmaLEX.isDelimiter(n4))) {
                            res.push(new EcmaOREF(n1, n2));
                        } else {
                            res.push(n1);
                            this.reset();
                        }
                    } else {
                        res.push(n1);
                    }
                    break;
                case 0x2f:
                    var str = this.getNameValue();
                    if (EcmaNAMES[str]) {//                   
                    } else {
                        EcmaNAMES[str] = new EcmaNAME(str);
                    }
                    res.push(EcmaNAMES[str]);
                    break;
                case 0x28:
                    res.push(this.getNormalString());
                    break;
                case 0x3c:
                    if (this.lookNextNext() === 0x3c) {
                        var dict = this.getDictionary();
                        res.push(dict);
                    } else {
                        res.push(this.getHexString());
                    }
                    break;
                case 0x5b:
                    res.push(this.getArray());
                    break;
                case 0x5d:
                    this.getByte();
                    return res;
                case 0x74:
                    //below is true;
                    if (this.data[this.pos + 1] === 0x72 && this.data[this.pos + 2] === 0x75
                            && this.data[this.pos + 3] === 0x65) {
                        res.push(true);
                        for (var i = 0; i < 4; i++) {
                            this.getByte();
                        }
                    } else {
                        this.getByte();
                    }
                    break;
                case 0x66:
                    //below is false;
                    if (this.data[this.pos + 1] === 0x61 && this.data[this.pos + 2] === 0x6c
                            && this.data[this.pos + 3] === 0x73 && this.data[this.pos + 4] === 0x65) {
                        res.push(false);
                        for (var i = 0; i < 5; i++) {
                            this.getByte();
                        }
                    } else {
                        this.getByte();
                    }
                    break;
                case 0x6e:
                    //below is null
                    if (this.data[this.pos + 1] === 0x75 && this.data[this.pos + 2] === 0x6c
                            && this.data[this.pos + 3] === 0x6c) {
                        res.push(null);
                        for (var i = 0; i < 4; i++) {
                            this.getByte();
                        }
                    } else {
                        this.getByte();
                    }
                default:
                    this.getByte();
                    break;
            }
        }
    };
    EcmaBuffer.prototype.getRawStream = function (dictObj) {
        while (true) {
            var n = this.lookNext();
            if (n === 0x73 && this.data[this.pos + 1] === 0x74
                    && this.data[this.pos + 2] === 0x72
                    && this.data[this.pos + 3] === 0x65
                    && this.data[this.pos + 4] === 0x61
                    && this.data[this.pos + 5] === 0x6d) {
                for (var i = 0; i < 6; i++) {
                    this.getByte();
                }
                break;
            } else if (n === -1) {
                return null;
            } else {
                this.getByte();
            }
        }
        this.skipLine();
        var len = this.getObjectValue(dictObj.keys[EcmaKEY.Length]);
        var res = new Array(len);
        for (var i = 0; i < len; i++) {
            res[i] = this.getByte() & 0xff;
        }
        while (true) {
            var n = this.lookNext();
            if (n === -1) {
                break;
            } else if (n === 0x65
                    && this.data[this.pos + 1] === 0x6e
                    && this.data[this.pos + 2] === 0x64
                    && this.data[this.pos + 3] === 0x73
                    && this.data[this.pos + 4] === 0x74
                    && this.data[this.pos + 5] === 0x72
                    && this.data[this.pos + 6] === 0x65
                    && this.data[this.pos + 7] === 0x61
                    && this.data[this.pos + 8] === 0x6d) {
                for (var i = 0; i < 9; i++) {
                    this.getByte();
                }
                break;
            } else {
                this.getByte();
            }
        }
        return res;
    };

    EcmaBuffer.prototype.getStream = function (dictObj) {
        if (dictObj.stream) {
            return dictObj.stream;
        }
        var res = dictObj.rawStream;
        var filter = dictObj.keys[EcmaKEY.Filter];
        if (filter) {
            if (filter instanceof Array) {
                for (var i = 0, ii = filter.length; i < ii; i++) {
                    res = EcmaFilter.decode(filter[i].name, res);
                }
            } else {
                res = EcmaFilter.decode(filter.name, res);
            }
        }
        var decodeParms = dictObj.keys[EcmaKEY.DecodeParms];
        if (decodeParms) {
            var predictor = 1;
            var colors = 1;
            var bitsPerComponent = 8;
            var columns = 1;
            var earlyChange = 1;
            if (decodeParms instanceof Array) {
                for (var i = 0, ii = decodeParms.length; i < ii; i++) {
                    var decodeDict = this.getObjectValue(decodeParms[i]);
                    var tt = decodeDict.keys[EcmaKEY.Predictor];
                    if (tt) {
                        predictor = tt;
                    }
                    tt = decodeDict.keys[EcmaKEY.Colors];
                    if (tt) {
                        colors = tt;
                    }
                    tt = decodeDict.keys[EcmaKEY.BitsPerComponent];
                    if (tt) {
                        bitsPerComponent = tt;
                    }
                    tt = decodeDict.keys[EcmaKEY.Columns];
                    if (tt) {
                        columns = tt;
                    }
                    tt = decodeDict.keys[EcmaKEY.EarlyChange];
                    if (tt) {
                        earlyChange = tt;
                    }
                }
            } else {
                var decodeDict = this.getObjectValue(decodeParms);
                var tt = decodeDict.keys[EcmaKEY.Predictor];
                if (tt) {
                    predictor = tt;
                }
                tt = decodeDict.keys[EcmaKEY.Colors];
                if (tt) {
                    colors = tt;
                }
                tt = decodeDict.keys[EcmaKEY.BitsPerComponent];
                if (tt) {
                    bitsPerComponent = tt;
                }
                tt = decodeDict.keys[EcmaKEY.Columns];
                if (tt) {
                    columns = tt;
                }
                tt = decodeDict.keys[EcmaKEY.EarlyChange];
                if (tt) {
                    earlyChange = tt;
                }
            }
            if (predictor !== 1) {
                var count = EcmaFilter.applyPredictor(res, predictor, null, colors, bitsPerComponent, columns, earlyChange);
                var bos = EcmaFilter.createByteBuffer(count);
                EcmaFilter.applyPredictor(res, predictor, bos, colors, bitsPerComponent, columns, earlyChange);
            }
            res = bos;
        }
        dictObj.stream = res;
        return res;
    };
//
//    EcmaBuffer.prototype.getStream2 = function (dictObj) {
//        while (true) {
//            var n = this.lookNext();
//            if (n === 0x73 && this.data[this.pos + 1] === 0x74
//                    && this.data[this.pos + 2] === 0x72
//                    && this.data[this.pos + 3] === 0x65
//                    && this.data[this.pos + 4] === 0x61
//                    && this.data[this.pos + 5] === 0x6d) {
//                for (var i = 0; i < 6; i++) {
//                    this.getByte();
//                }
//                break;
//            } else if (n === -1) {
//                return null;
//            } else {
//                this.getByte();
//            }
//        }
//        this.skipLine();
//        var len = this.getObjectValue(dictObj.keys[EcmaKEY.Length]);
//        var res = new Array(len);
//        for (var i = 0; i < len; i++) {
//            res[i] = this.getByte() & 0xff;
//        }
//
//        var raw = new Array(len);
//        for (var i = 0; i < len; i++) {
//            raw[i] = res[i];
//        }
//        dictObj.rawStream = raw;
//        while (true) {
//            var n = this.lookNext();
//            if (n === -1) {
//                break;
//            } else if (n === 0x65
//                    && this.data[this.pos + 1] === 0x6e
//                    && this.data[this.pos + 2] === 0x64
//                    && this.data[this.pos + 3] === 0x73
//                    && this.data[this.pos + 4] === 0x74
//                    && this.data[this.pos + 5] === 0x72
//                    && this.data[this.pos + 6] === 0x65
//                    && this.data[this.pos + 7] === 0x61
//                    && this.data[this.pos + 8] === 0x6d) {
//                for (var i = 0; i < 9; i++) {
//                    this.getByte();
//                }
//                break;
//            } else {
//                this.getByte();
//            }
//        }
//        var filter = dictObj.keys[EcmaKEY.Filter];
//        if (filter) {
//            if (filter instanceof Array) {
//                for (var i = 0, ii = filter.length; i < ii; i++) {
//                    res = EcmaFilter.decode(filter[i].name, res);
//                }
//            } else {
//                res = EcmaFilter.decode(filter.name, res);
//            }
//        }
//        var decodeParms = dictObj.keys[EcmaKEY.DecodeParms];
//        if (decodeParms) {
//            var predictor = 1;
//            var colors = 1;
//            var bitsPerComponent = 8;
//            var columns = 1;
//            var earlyChange = 1;
//            if (decodeParms instanceof Array) {
//                for (var i = 0, ii = decodeParms.length; i < ii; i++) {
//                    var decodeDict = this.getObjectValue(decodeParms[i]);
//                    var tt = decodeDict.keys[EcmaKEY.Predictor];
//                    if (tt) {
//                        predictor = tt;
//                    }
//                    tt = decodeDict.keys[EcmaKEY.Colors];
//                    if (tt) {
//                        colors = tt;
//                    }
//                    tt = decodeDict.keys[EcmaKEY.BitsPerComponent];
//                    if (tt) {
//                        bitsPerComponent = tt;
//                    }
//                    tt = decodeDict.keys[EcmaKEY.Columns];
//                    if (tt) {
//                        columns = tt;
//                    }
//                    tt = decodeDict.keys[EcmaKEY.EarlyChange];
//                    if (tt) {
//                        earlyChange = tt;
//                    }
//                }
//            } else {
//                var decodeDict = this.getObjectValue(decodeParms);
//                var tt = decodeDict.keys[EcmaKEY.Predictor];
//                if (tt) {
//                    predictor = tt;
//                }
//                tt = decodeDict.keys[EcmaKEY.Colors];
//                if (tt) {
//                    colors = tt;
//                }
//                tt = decodeDict.keys[EcmaKEY.BitsPerComponent];
//                if (tt) {
//                    bitsPerComponent = tt;
//                }
//                tt = decodeDict.keys[EcmaKEY.Columns];
//                if (tt) {
//                    columns = tt;
//                }
//                tt = decodeDict.keys[EcmaKEY.EarlyChange];
//                if (tt) {
//                    earlyChange = tt;
//                }
//            }
//            if (predictor !== 1) {
//                var count = EcmaFilter.applyPredictor(res, predictor, null, colors, bitsPerComponent, columns, earlyChange);
//                var bos = EcmaFilter.createByteBuffer(count);
//                EcmaFilter.applyPredictor(res, predictor, bos, colors, bitsPerComponent, columns, earlyChange);
//            }
//            res = bos;
//        }
//        return res;
//    };
    EcmaBuffer.prototype.getObjectValue = function (obj) {
        if (EcmaLEX.isName(obj)) {
            return obj.name;
        } else if (EcmaLEX.isDict(obj)) {
            return obj;
        } else if (EcmaLEX.isRef(obj)) {
            var io = this.getIndirectObject(obj, this.data, false);
            return this.getObjectValue(io);
        } else {
            return obj;
        }
    };

    EcmaBuffer.prototype.getIndirectObject = function (objRef) {
        for (var items in EcmaOBJECTOFFSETS) {
            if (items === objRef.ref) {
                var objoff = EcmaOBJECTOFFSETS[items];
                var offset = objoff.offset;
                var subBuffer = new EcmaBuffer(objoff.data);
                var isStream = objoff.isStream;
                if (isStream) {
                    if (objoff.data) {
                        subBuffer.movePos(offset);
                        return subBuffer.getObj();
                    } else {
                        return null;
                    }
                } else { //normal so need to read obj and endobj keywords
                    subBuffer.movePos(offset);
                    while (true) {
                        var n = subBuffer.lookNext();
                        if (n === -1) {
                            return null;
                        } else if (n === 0x6f && subBuffer.data[subBuffer.pos + 1] === 0x62
                                && subBuffer.data[subBuffer.pos + 2] === 0x6a) {
                            for (var i = 0; i < 3; i++) {
                                subBuffer.getByte();
                            }
                            break;
                        } else {
                            subBuffer.getByte();
                        }
                    }
                    return subBuffer.getObj();
                }
            }
        }
        return null;
    };
    EcmaBuffer.prototype.getObj = function () {
        while (true) {
            var n = this.lookNext();
            switch (n) {
                case - 1:
                    return null;
                case 0x30:
                case 0x31:
                case 0x32:
                case 0x33:
                case 0x34:
                case 0x35:
                case 0x36:
                case 0x37:
                case 0x38:
                case 0x39:
                case 0x2b:
                case 0x2d:
                case 0x2e:
                    var n1 = this.getNumberValue();
                    var sp = this.lookNext();
                    var n2 = this.lookNextNext();
                    var sp2 = this.data[this.pos + 2];
                    var sp3 = this.data[this.pos + 3];
                    if (EcmaLEX.isWhiteSpace(sp) && EcmaLEX.isDigit(n2)
                            && EcmaLEX.isWhiteSpace(sp2) && sp3 === 82) {
                        this.getByte();
                        n2 = this.getNumberValue();
                        this.getByte();
                        this.getByte();
                        return new EcmaOREF(n1, n2);
                    } else {
                        return n1;
                    }
                case 0x2f:
                    return this.getNameValue();
                case 0x28:
                    return this.getNormalString();
                case 0x3c:
                    if (this.lookNextNext() === 0x3c) {
                        return this.getDictionary();
                    } else {
                        return this.getHexString();
                    }
                case 0x5b:
                    return this.getArray();
                case 0x74:
                    //below is true;
                    if (this.data[this.pos + 1] === 0x72 && this.data[this.pos + 2] === 0x75
                            && this.data[this.pos + 3] === 0x65) {
                        for (var i = 0; i < 4; i++) {
                            this.getByte();
                        }
                        return true;
                    } else {
                        this.getByte();
                    }
                    break;
                case 0x66:
                    //below is false;
                    if (this.data[this.pos + 1] === 0x61 && this.data[this.pos + 2] === 0x6c
                            && this.data[this.pos + 3] === 0x73 && this.data[this.pos + 4] === 0x65) {
                        for (var i = 0; i < 5; i++) {
                            this.getByte();
                        }
                        return false;
                    } else {
                        this.getByte();
                    }
                case 0x6e:
                    //below is null
                    if (this.data[this.pos + 1] === 0x75 && this.data[this.pos + 2] === 0x6c
                            && this.data[this.pos + 3] === 0x6c) {
                        for (var i = 0; i < 4; i++) {
                            this.getByte();
                        }
                        return null;
                    } else {
                        this.getByte();
                    }
                default:
                    this.getByte();
                    break;
            }
        }
        return null;
    };
    EcmaBuffer.prototype.readSimpleXREF = function () {
        var nn = this.lookNext();
        if (EcmaLEX.isDigit(nn)) {
            this.readStreamXREF();
            return;
        }
        this.skipLine(); // reads xref command;  
        var trailer = null;
        while (true) {
            var n = this.lookNext();
            if (n === -1) {
                break;
            } else if (EcmaLEX.isEOL(n)) {
                this.skipLine();
                continue;
            } else if (n === 0x74
                    && this.data[this.pos + 1] === 0x72
                    && this.data[this.pos + 2] === 0x61
                    && this.data[this.pos + 3] === 0x69
                    && this.data[this.pos + 4] === 0x6c
                    && this.data[this.pos + 5] === 0x65
                    && this.data[this.pos + 6] === 0x72) {
                trailer = this.getObj();
                break;
            }
            var start = this.getObj();
            this.getByte();
            var count = this.getObj();
            this.skipLine();
            for (var i = 0; i < count; i++) {
                var offset = this.getObj();
                var gen = this.getObj();
                var end = this.getNextLine();
                end = end.trim();
                var ref = (start + i) + " " + gen + " R";
                if (end === "n" && !EcmaOBJECTOFFSETS[ref]) {
                    EcmaOBJECTOFFSETS[ref] = new EcmaOBJOFF(offset, this.data, false);
                }
            }
        }
        if (trailer) {
            if (!EcmaMainCatalog) {
                EcmaMainCatalog = trailer.keys["Root"];
            }
            var prev = trailer.keys[EcmaKEY.Prev];
            if (prev) {
                var prevOffset = this.getObjectValue(prev);
                this.movePos(prevOffset);
                this.readSimpleXREF();
            }
        } else {
            showEcmaParserError("Trailer not found");
        }
    };

    EcmaBuffer.prototype.readStreamXREF = function () {
        EcmaXRefType = 1;
        this.getObj();
        this.getObj();
        var refDict = this.getObj();
        var res = this.getStream(refDict);
        var wArr = refDict.keys[EcmaKEY.W];
        var indexArr = refDict.keys[EcmaKEY.Index];
        if (!indexArr) {
            indexArr = [0, refDict.keys[EcmaKEY.Size]];
        }
        var typeLen = wArr[0];
        var offsetLen = wArr[1];
        var genLen = wArr[2];
        var total = indexArr.length;
        var p = 0;

        var buf = new EcmaBuffer(res);

        while (total > p) {
            var start = indexArr[p++];
            var end = start + indexArr[p++];
            for (var i = start; i < end; i++) {
                var type = 0, offset = 0, gen = 0;
                if (typeLen === 0) {
                    type = 1;
                } else {
                    for (var j = 0; j < typeLen; j++) {
                        type = (type << 8) | buf.getByte();
                    }
                }
                for (var j = 0; j < offsetLen; j++) {
                    offset = (offset << 8) | buf.getByte();
                }
                for (var j = 0; j < genLen; j++) {
                    gen = (gen << 8) | buf.getByte();
                }
                var entryRef = (i) + " " + gen + " R";
                if (!EcmaOBJECTOFFSETS[entryRef]) {
                    switch (type) {
                        case 0:
                            break;
                        case 1:
                            EcmaOBJECTOFFSETS[entryRef] = new EcmaOBJOFF(offset, EcmaMainData, false);
                            break;
                        case 2:
                            EcmaOBJECTOFFSETS[entryRef] = new EcmaOBJOFF(offset, null, true);
                            break;
                    }
                }
            }
        }
        if (!EcmaMainCatalog) {
            EcmaMainCatalog = refDict.keys["Root"];
        }
        var prev = refDict.keys[EcmaKEY.Prev];
        if (prev) {
            var prevOffset = this.getObjectValue(prev);
            this.movePos(prevOffset);
            this.readSimpleXREF();
        }
    };
    EcmaBuffer.prototype.findFirstXREFOffset = function () {
        var i = this.data.length - 10;
        while (i > 0) {
            var ch = this.data[i];
            if (ch === 0x73
                    && this.data[i + 1] === 0x74
                    && this.data[i + 2] === 0x61
                    && this.data[i + 3] === 0x72
                    && this.data[i + 4] === 0x74
                    && this.data[i + 5] === 0x78
                    && this.data[i + 6] === 0x72
                    && this.data[i + 7] === 0x65
                    && this.data[i + 8] === 0x66) {
                this.movePos(i);
                this.skipLine();
                var offset = this.getObj();
                return offset;
            }
            i--;
        }
        return -1;
    };
    EcmaBuffer.prototype.updateAllObjStm = function () {
        for (var ee in EcmaOBJECTOFFSETS) {
            var arr = ee.split(" ");
            var tref = new EcmaOREF(arr[0], arr[1]);
            var dd = this.getIndirectObject(tref);
            if (dd instanceof EcmaDICT && dd.keys[EcmaKEY.Type]
                    && dd.keys[EcmaKEY.Type].name === EcmaKEY.ObjStm) {
                var nn = dd.keys[EcmaKEY.N];
                var first = dd.keys[EcmaKEY.First];
                var subBuf = new EcmaBuffer(this.getStream(dd));
                for (var i = 0; i < nn; i++) {
                    var id = subBuf.getNumberValue();
                    subBuf.getByte();
                    var offset = subBuf.getNumberValue();
                    subBuf.getByte();
                    var entryRef = id + " " + 0 + " R";
                    var objoff = new EcmaOBJOFF((first + offset), this.getStream(dd), true);
                    if (entryRef in EcmaOBJECTOFFSETS) {
                        if (EcmaOBJECTOFFSETS[entryRef].isStream && !EcmaOBJECTOFFSETS[entryRef].data) {
                            EcmaOBJECTOFFSETS[entryRef] = objoff;
                        }
                    } else {
                        EcmaOBJECTOFFSETS[entryRef] = objoff;
                    }
                }
            }
        }
    };
    EcmaBuffer.prototype.updatePageOffsets = function () {
        var mc = this.getObjectValue(EcmaMainCatalog);
        var pageTree = mc.keys[EcmaKEY.Pages];
        if (pageTree) {
            pageTree = this.getObjectValue(pageTree);
            this.getPagesFromPageTree(pageTree);
        }
    };
    EcmaBuffer.prototype.getPagesFromPageTree = function (pageTreeDict) {
        var kids = pageTreeDict.keys[EcmaKEY.Kids];
        kids = this.getObjectValue(kids);
        for (var i = 0, ii = kids.length; i < ii; i++) {
            var kRef = kids[i];
            var kDict = this.getObjectValue(kRef);
            var type = kDict.keys[EcmaKEY.Type];
            if (type.name === EcmaKEY.Pages) {
                this.getPagesFromPageTree(kDict);
            } else if (type.name === EcmaKEY.Page) {
                EcmaPageOffsets.push(kRef);
            }
        }
    };
    var EcmaParser = {
        saveFormToPDF: function (fileName) {
            var dataArr = this._insertFieldsToPDF(fileName);
            this._openURL(fileName, dataArr);
        },
        _insertFieldsToPDF: function (fileName) {
            this._updateFileInfo(fileName);
            var buff = new EcmaBuffer(EcmaMainData);
            var prev = buff.findFirstXREFOffset();
            if (prev) {
                buff.movePos(prev);
                buff.readSimpleXREF();
            }
            buff.updateAllObjStm();
            buff.updatePageOffsets();
            var maxUsed = 1;
            for (var nn in EcmaOBJECTOFFSETS) {
                var mm = nn.split(" ");
                maxUsed = Math.max(parseInt(mm[0]), maxUsed);
            }
            maxUsed++;

            var fieldDicts = [];
            var fieldRefs = [];

            var ecmaMainDict = buff.getObjectValue(EcmaMainCatalog);
            var acroformRef = ecmaMainDict.keys[EcmaKEY.AcroForm];
            var acroform = buff.getObjectValue(acroformRef);
            delete acroform.keys[EcmaKEY.XFA];

            fieldDicts.push(acroform);
            fieldRefs.push(acroformRef);

            var inputs = document.getElementsByTagName("input");
            var textareas = document.getElementsByTagName("textarea");
            var selects = document.getElementsByTagName("select");

            var texts = [];
            var checks = [];
            var radios = [];
            var choices = [];
            var btns = [];

            for (var i = 0, ii = inputs.length; i < ii; i++) {
                var inp = inputs[i];
                var ref = inp.getAttribute("data-objref");
                if (ref && ref.length > 0) {
                    var type = inp.type.toUpperCase();
                    if (type === "TEXT" || type === "PASSWORD") {
                        texts.push(inp);
                    } else if (type === "CHECKBOX") {
                        checks.push(inp);
                    } else if (type === "RADIO") {
                        radios.push(inp);
                    } else if (type === "BUTTON") {
                        btns.push(inp);
                    }
                }
            }
            for (var i = 0, ii = textareas.length; i < ii; i++) {
                var inp = textareas[i];
                var ref = inp.getAttribute("data-objref");
                if (ref && ref.length > 0) {
                    texts.push(inp);
                }
            }
            for (var i = 0, ii = selects.length; i < ii; i++) {
                var inp = selects[i];
                var ref = inp.getAttribute("data-objref");
                if (ref && ref.length > 0) {
                    choices.push(inp);
                }
            }

            for (var i = 0, ii = texts.length; i < ii; i++) {
                var fieldText = texts[i].value;
                var refStr = texts[i].getAttribute("data-objref");
                var fieldRef = EcmaLEX.getRefFromString(refStr);
                var fieldDict = buff.getObjectValue(fieldRef);
                fieldDicts.push(fieldDict);
                fieldRefs.push(fieldRef);
                EcmaFormField.editTextField(buff, fieldDicts, fieldRefs, fieldDict, fieldText, maxUsed);
                maxUsed++;
            }

            for (var i = 0, ii = btns.length; i < ii; i++) {
                var refStr = btns[i].getAttribute("data-objref");
                var fieldRef = EcmaLEX.getRefFromString(refStr);
                var fieldDict = buff.getObjectValue(fieldRef);

                var flags = fieldDict.keys[EcmaKEY.F];
                var fieldName = btns[i].getAttribute("data-field-name");
                var field = idrform.doc.getField(fieldName);

                if (btns[i].dataset && btns[i].dataset.defaultDisplay && field.display !== Number(btns[i].dataset.defaultDisplay)) {
                    fieldDicts.push(fieldDict);
                    fieldRefs.push(fieldRef);
                    EcmaFormField.handleDisplayChange(fieldDict, field, flags);
                };
            }

            for (var i = 0, ii = checks.length; i < ii; i++) {
                var curSelect = checks[i].checked;
                var refStr = checks[i].getAttribute("data-objref");
                var fieldRef = EcmaLEX.getRefFromString(refStr);
                var fieldDict = buff.getObjectValue(fieldRef);
                fieldDicts.push(fieldDict);
                fieldRefs.push(fieldRef);
                EcmaFormField.selectCheckBox(curSelect, fieldDict);
            }

            for (var i = 0, ii = choices.length; i < ii; i++) {
                var selected = choices[i].value;
                var refStr = choices[i].getAttribute("data-objref");
                var fieldRef = EcmaLEX.getRefFromString(refStr);
                var fieldDict = buff.getObjectValue(fieldRef);
                fieldDicts.push(fieldDict);
                fieldRefs.push(fieldRef);
                EcmaFormField.selectChoice(fieldDicts, fieldRefs, fieldDict, selected, maxUsed);
                maxUsed++;
            }

            var radiosObj = {};
            for (var i = 0, ii = radios.length; i < ii; i++) {
                var radio = radios[i];
                var refStr = radio.getAttribute("data-objref");
                var fieldRef = EcmaLEX.getRefFromString(refStr);
                var fieldDict = buff.getObjectValue(fieldRef);
                var parRefStr = fieldDict.keys[EcmaKEY.Parent].ref;
                var isChecked = radio.checked;
                var value = radio.value;
                if (parRefStr) {
                    if (parRefStr in radiosObj) {
                        radiosObj[parRefStr].push({
                            radioRef: refStr, parentRef: parRefStr,
                            checked: isChecked, value: value
                        });
                    } else {
                        radiosObj[parRefStr] = [{
                                radioRef: refStr, parentRef: parRefStr,
                                checked: isChecked, value: value
                            }];
                    }
                } else {
                    radiosObj[refStr] = [{
                            radioRef: refStr, parentRef: null,
                            checked: isChecked, value: value
                        }];
                }
            }
            for (var pp in radiosObj) {
                var arr = radiosObj[pp];
                var parRefStr = arr[0].parentRef;
                if (parRefStr) {
                    var parentRef = EcmaLEX.getRefFromString(parRefStr);
                    var parentDict = buff.getObjectValue(parentRef);
                    fieldRefs.push(parentRef);
                    fieldDicts.push(parentDict);

                    var hasSelection = false;
                    var curValue = null;

                    for (var i = 0, ii = arr.length; i < ii; i++) {
                        if (arr[i].checked) {
                            curValue = arr[i].value;
                            hasSelection = true;
                            break;
                        }
                    }
                    if (hasSelection) {
                        parentDict.keys[EcmaKEY.V] = new EcmaNAME(curValue);
                    } else {
                        delete parentDict.keys[EcmaKEY.V];
                    }

                    for (var i = 0, ii = arr.length; i < ii; i++) {
                        var radioRef = EcmaLEX.getRefFromString(arr[i].radioRef);
                        var radioDict = buff.getObjectValue(radioRef);
                        fieldRefs.push(radioRef);
                        fieldDicts.push(radioDict);
                        EcmaFormField.selectRadioChild(arr[i], radioDict);
                    }
                } else {
                    var radioRef = EcmaLEX.getRefFromString(arr[i].radioRef);
                    var radioDict = buff.getObjectValue(radioRef);
                    fieldRefs.push(radioRef);
                    fieldDicts.push(radioDict);
                    EcmaFormField.selectRadioChild(arr[i], radioDict);
                }
            }
            this._saveFieldObjects(prev, maxUsed, fieldRefs, fieldDicts);
            return EcmaMainData;
        },
        _saveFieldObjects: function (prev, maxUsed, fieldRefs, fieldDicts) {

            var objOff = EcmaMainData.length;
            var fieldOffsets = [];

            for (var i = 0, ii = fieldRefs.length; i < ii; i++) {
                var fieldRef = fieldRefs[i].num;
                var fieldDict = fieldDicts[i];
                fieldOffsets.push({ref: fieldRef, offset: objOff});
                var dictBytes = [];
                if (fieldDict.keys[EcmaKEY.Length]) {

                    var startBytes = EcmaLEX.textToBytes(fieldRef + " 0 obj\n");
                    var midBytes = EcmaLEX.textToBytes(EcmaLEX.objectToText(fieldDicts[i]) + "stream\n");
                    var streamBytes = fieldDicts[i].rawStream;
                    var endBytes = EcmaLEX.textToBytes("\nendstream\nendobj\n");

                    EcmaLEX.pushBytesToBuffer(startBytes, dictBytes);
                    EcmaLEX.pushBytesToBuffer(midBytes, dictBytes);
                    EcmaLEX.pushBytesToBuffer(streamBytes, dictBytes);
                    EcmaLEX.pushBytesToBuffer(endBytes, dictBytes);
                    EcmaLEX.pushBytesToBuffer(dictBytes, EcmaMainData);

                } else {
                    var dictionaryStr = fieldRef + " 0 obj\n" + EcmaLEX.objectToText(fieldDicts[i]) + "\nendobj\n";
                    var dictBytes = EcmaLEX.textToBytes(dictionaryStr);
                    EcmaLEX.pushBytesToBuffer(dictBytes, EcmaMainData);
                }
                objOff += dictBytes.length;
            }

            var current = EcmaMainData.length; //current xref offset
            if (EcmaXRefType) {
                var indexStr = "[";
                var wBytes = [];
                for (var i = 0, ii = fieldOffsets.length; i < ii; i++) {
                    var ref = fieldOffsets[i].ref;
                    var offset = fieldOffsets[i].offset;
                    wBytes.push(1);
                    EcmaLEX.pushBytesToBuffer(EcmaLEX.toBytes32(offset), wBytes);
                    wBytes.push(0);
                    indexStr += ref + " 1 ";
                }
                indexStr += "]";

                var size = maxUsed;
                var dictStr = size + " 0 obj\n<</Type /XRef /Root " + EcmaMainCatalog.ref
                        + " /Prev " + prev + " /Index " + indexStr + " /W [1 4 1] /Size " + size
                        + "/Length " + wBytes.length + ">>stream\n";
                EcmaLEX.pushBytesToBuffer(EcmaLEX.textToBytes(dictStr), EcmaMainData);
                EcmaLEX.pushBytesToBuffer(wBytes, EcmaMainData);
                dictStr = "\nendstream\nendobj\nstartxref\n" + current + "\n%%EOF";
                EcmaLEX.pushBytesToBuffer(EcmaLEX.textToBytes(dictStr), EcmaMainData);
            } else {
                EcmaLEX.pushBytesToBuffer([120, 114, 101, 102, 0xa], EcmaMainData);
                var temp = "";
                for (var i = 0, ii = fieldOffsets.length; i < ii; i++) {
                    var fieldRef = fieldOffsets[i].ref;
                    var fieldOffset = fieldOffsets[i].offset;
                    temp += fieldRef + " 1\n" + EcmaLEX.getZeroLead(fieldOffset) + " 00000 n \n";
                }
                var size = maxUsed;
                temp += "trailer\n<</Size " + size + " /Root " + EcmaMainCatalog.ref + " /Prev " + prev + ">>\n";
                temp += "startxref\n" + current + "\n%%EOF";
                EcmaLEX.pushBytesToBuffer(EcmaLEX.textToBytes(temp), EcmaMainData);
            }
        },
        saveAnnotationToPDF: function (fileName, annotArr) {
            this._updateFileInfo(fileName);
            var buff = new EcmaBuffer(EcmaMainData);
            var prev = buff.findFirstXREFOffset();
            if (prev) {
                buff.movePos(prev);
                buff.readSimpleXREF();
            }
            buff.updateAllObjStm();
            buff.updatePageOffsets();
            var maxRef = 1;
            for (var nn in EcmaOBJECTOFFSETS) {
                var mm = nn.split(" ");
                maxRef = Math.max(parseInt(mm[0]), maxRef);
            }
            maxRef++;
            this._saveAnnotObjects(fileName, prev, maxRef, annotArr);

        },
        _updateFileInfo: function (fileName) {
            EcmaNAMES = {};
            EcmaOBJECTOFFSETS = {};
            EcmaPageOffsets = [];
            EcmaMainCatalog = null;
            EcmaXRefType = 0; //zero for old and 1 for stream;
            var dd = document.getElementById("FDFXFA_PDFDump");
            if (dd) {
                EcmaMainData = EcmaFilter.decodeBase64(dd.textContent);
            } else {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    EcmaMainData = [];
                    if (xhttp.readyState === 4 && xhttp.status === 200) {
                        var str = xhttp.responseText;
                        for (var i = 0, ii = str.length; i < ii; i++) {
                            EcmaMainData.push(str.charCodeAt(i) & 0xff);
                        }
                        return;
                    }
                };
                xhttp.open("GET", fileName, false);
                xhttp.overrideMimeType('text\/plain; charset=x-user-defined');
                xhttp.send();
            }
        },
        _saveAnnotObjects: function (fileName, prev, maxUsed, annotArr) {

            var objRef = maxUsed;
            var objOff = EcmaMainData.length;
            var annotOffsets = [];
            var pageOffsetsObj = {};
            var pageDictsObj = {};

            var tBuff = new EcmaBuffer(EcmaMainData);

            for (var i = 0, ii = annotArr.length; i < ii; i++) {

                var pageNum = annotArr[i].page;
                var pageNumStr = "" + pageNum;

                var page = EcmaPageOffsets[pageNum];
                var pageDict;
                if (pageNumStr in pageDictsObj) {
                    pageDict = pageDictsObj[pageNumStr];
                } else {

                    pageDict = tBuff.getObjectValue(page);
                    pageDictsObj[pageNumStr] = pageDict;
                }

                var annotName = pageDict.keys[EcmaKEY.Annots];

                pageOffsetsObj[pageNumStr] = page.num;

                annotOffsets.push({ref: objRef, offset: objOff});
                var dictionaryStr = objRef + " 0 obj\n" + annotArr[i].getDictionaryString() + "\nendobj\n";
                var dictBytes = EcmaLEX.textToBytes(dictionaryStr);
                EcmaLEX.pushBytesToBuffer(dictBytes, EcmaMainData);
                if (annotName) {
                    if (EcmaLEX.isRef(annotName)) {
                        var annotRef = tBuff.getObjectValue(annotName);
                        if (EcmaLEX.isArray(annotRef)) {
                            pageDict.keys[EcmaKEY.Annots] = [];
                            for (var j = 0, jj = annotRef.length; j < jj; j++) {
                                pageDict.keys[EcmaKEY.Annots].push(annotRef[j]);
                            }
                            pageDict.keys[EcmaKEY.Annots].push(new EcmaOREF(objRef, 0));
                        } else {
                            pageDict.keys[EcmaKEY.Annots] = [annotName];
                            pageDict.keys[EcmaKEY.Annots].push(new EcmaOREF(objRef, 0));
                        }

//                     pageDict.keys[EcmaKEY.Annots] = [new EcmaOREF(objRef, 0)];
                    } else if (EcmaLEX.isArray(annotName)) {
                        annotName.push(new EcmaOREF(objRef, 0));
                    } else {
                        pageDict.keys[EcmaKEY.Annots] = [new EcmaOREF(objRef, 0)];
                    }
                } else {
                    pageDict.keys[EcmaKEY.Annots] = [new EcmaOREF(objRef, 0)];
                }
                objOff += dictBytes.length;
                objRef++;
            }

            var curPageStart = EcmaMainData.length;
            for (var pn in pageOffsetsObj) {
                var pageRef = pageOffsetsObj[pn];
                pageOffsetsObj[pn] = {ref: pageRef, offset: curPageStart}; //now store page offset points 
                var pageDict = pageDictsObj[pn];
                var pageDictStr = pageRef + " 0 obj\n" + EcmaLEX.objectToText(pageDict) + "\nendobj\n";
                var dictBytes = EcmaLEX.textToBytes(pageDictStr);
                EcmaLEX.pushBytesToBuffer(dictBytes, EcmaMainData);
                curPageStart = EcmaMainData.length;
            }

            var current = EcmaMainData.length; //current xref offset
            if (EcmaXRefType) {
                this._generateStreamXREF(prev, current, maxUsed, annotOffsets, pageOffsetsObj);
            } else {
                this._generateSimpleXREF(prev, current, maxUsed, annotOffsets, pageOffsetsObj);
            }
            this._openURL(fileName);
        },
        _generateSimpleXREF: function (prev, current, maxUsed, annotOffsets, pageOffsetsObj) {
            EcmaLEX.pushBytesToBuffer([120, 114, 101, 102, 0xa], EcmaMainData);
            var temp = "";
            for (var pn in pageOffsetsObj) {
                var pageRef = pageOffsetsObj[pn].ref;
                var pageOffset = pageOffsetsObj[pn].offset;
                temp += pageRef + " 1\n" + EcmaLEX.getZeroLead(pageOffset) + " 00000 n \n";
            }
            var totalAnnots = annotOffsets.length;
            if (totalAnnots) {
                temp += maxUsed + " " + totalAnnots + "\n";
                for (var i = 0, ii = totalAnnots; i < ii; i++) {
                    temp += EcmaLEX.getZeroLead(annotOffsets[i].offset) + " 00000 n \n";
                }
            }
            var size = maxUsed + totalAnnots;
            temp += "trailer\n<</Size " + size + " /Root " + EcmaMainCatalog.ref + " /Prev " + prev + ">>\n";
            temp += "startxref\n" + current + "\n%%EOF";
            EcmaLEX.pushBytesToBuffer(EcmaLEX.textToBytes(temp), EcmaMainData);

        },
        _generateStreamXREF: function (prev, current, maxUsed, annotOffsets, pageOffsetsObj) {
            var totalAnnots = annotOffsets.length;
            var indexStr = "[";
            var wBytes = [];
            for (var pn in pageOffsetsObj) {
                var ref = pageOffsetsObj[pn].ref;
                var offset = pageOffsetsObj[pn].offset;
                wBytes.push(1);
                EcmaLEX.pushBytesToBuffer(EcmaLEX.toBytes32(offset), wBytes);
                wBytes.push(0);
                indexStr += ref + " 1 ";
            }
            indexStr += maxUsed + " " + totalAnnots + "]";
            for (var i = 0; i < totalAnnots; i++) {
                var offset = annotOffsets[i].offset;
                wBytes.push(1);
                EcmaLEX.pushBytesToBuffer(EcmaLEX.toBytes32(offset), wBytes);
                wBytes.push(0);
            }
            var size = maxUsed + totalAnnots + 1;
            var dictStr = size + " 0 obj\n<</Type /XRef /Root " + EcmaMainCatalog.ref
                    + " /Prev " + prev + " /Index " + indexStr + " /W [1 4 1] /Size " + size
                    + "/Length " + wBytes.length + ">>stream\n";
            EcmaLEX.pushBytesToBuffer(EcmaLEX.textToBytes(dictStr), EcmaMainData);
            EcmaLEX.pushBytesToBuffer(wBytes, EcmaMainData);
            dictStr = "\nendstream\nendobj\nstartxref\n" + current + "\n%%EOF";
            EcmaLEX.pushBytesToBuffer(EcmaLEX.textToBytes(dictStr), EcmaMainData);

        },
        _openURL: function (fileName, dataArr) {
            var str = EcmaFilter.encodeBase64(dataArr);
            var hrefStr = "data:application/octet-stream;base64," + str;
            var title = fileName;
            var userAgent = "" + navigator.userAgent;
            if (userAgent.indexOf("Edge") !== -1 || userAgent.indexOf("MSIE ") !== -1) {
                var ab = new ArrayBuffer(dataArr.length);
                var ia = new Uint8Array(ab);
                for (var i = 0, ii = dataArr.length; i < ii; i++) {
                    ia[i] = dataArr[i] & 0xff;
                }
                var blobObject = new Blob([ab], {type: "application/octet-stream"});
                window.navigator.msSaveBlob(blobObject, title);
                return;
            }
            var link = document.createElement("a");
            link.setAttribute("download", title);
            link.setAttribute("href", hrefStr);
            document.body.appendChild(link);
            if ("click" in link) {
                link.click();
            } else { //hack for safari
                var clk = document.createEvent("MouseEvent");
                clk.initEvent("click", true, true);
                link.dispatchEvent(clk);
            }
            link.setAttribute("href", "");
        }
    };

    var FONTNAMES = {
        "ARIAL": "Arial", "HELVETICA": "Helvetica", "COURIER": "Courier"
    };

    var EcmaPDF = {
        hashKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        getDictionaryString: function (dataBytes, offsetStart) {
            var pos = offsetStart;
            var max = dataBytes.length;
            while (pos < max && dataBytes[pos] !== 60) {
                pos++;
            }
            var dictStack = [1];
            var result = "<<";
            pos += 2;
            while (dictStack.length !== 0 && pos < max) {
                var cc = dataBytes[pos];
                var next = dataBytes[pos + 1];
                if (cc === 60 && next && next === 60) {
                    dictStack.push(1);
                    pos += 2;
                    result += "<<";
                    continue;
                } else if (cc === 62 && next && next === 62) {
                    dictStack.pop();
                    pos += 2;
                    result += ">>";
                    continue;
                } else {
                    result += String.fromCharCode(cc);
                    pos++;
                }
            }
            return result;
        },
        byteToString: function (charCode) {
            return String.fromCharCode(charCode);
        },
        bytesToString: function (array) {
            var result = "";
            for (var i = 0; i < array.length; i++) {
                result += String.fromCharCode(parseInt(array[i]));
            }
            return result;
        },
        writeBytes: function (str, data) {
            for (var i = 0; i < str.length; i++) {
                var cc = str.charCodeAt(i);
                if (cc < 0x80) {
                    data.push(cc);
                } else if (cc < 0x800) {
                    data.push(0xc0 | (cc >> 6), 0x80 | (cc & 0x3f));
                } else if (cc < 0xd800 || cc >= 0xe000) {
                    data.push(0xe0 | (cc >> 12), 0x80 | ((cc >> 6) & 0x3f),
                            0x80 | (cc & 0x3f));
                } else {
                    i++;
                    cc = 0x10000 + (((cc & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
                    data.push(0xf0 | (cc >> 18), 0x80 | ((cc >> 12) & 0x3f),
                            0x80 | ((cc >> 6) & 0x3f), 0x80 | (cc & 0x3f));
                }
            }
        },
        encode64: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = this.encodeUTF8(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output += this.hashKey.charAt(enc1) + this.hashKey.charAt(enc2) +
                        this.hashKey.charAt(enc3) + this.hashKey.charAt(enc4);
            }
            return output;
        },
        decode64: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            var ii = input.length;

            while (i < ii) {
                enc1 = this.hashKey.indexOf(input.charAt(i++));
                enc2 = this.hashKey.indexOf(input.charAt(i++));
                enc3 = this.hashKey.indexOf(input.charAt(i++));
                enc4 = this.hashKey.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output += String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output += String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output += String.fromCharCode(chr3);
                }
            }
            output = this.decodeUTF8(output);
            return output;

        },
        encodeUTF8: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0, nn = string.length; n < nn; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        decodeUTF8: function (utftext) {
            var string = "";
            var i = 0;
            var c = 0, c2, c3;
            var ii = utftext.length;
            while (i < ii) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    };

    function PdfDocument() {
        this._pages = new Array();
        this._xfaStreams = new Array();
        this._fontResources = new Array();
        for (var fn in FONTNAMES) {
            var stream = "<</Type /Font /Subtype /Type1 /BaseFont /" + FONTNAMES[fn] + ">>";
            var xx = new PdfResource(FONTNAMES[fn], stream);
            this._fontResources.push(xx);
        }
    }

    PdfDocument.prototype.addPage = function (objParam) {
        this._pages.push(objParam);
    };

    PdfDocument.prototype.addXFAStream = function (objParam) {
        this._xfaStreams.push(objParam);
    };

    function PdfPage() {
        this._width = 612;
        this._height = 792;
        this._rotation = 0;
        this._texts = new Array();
        this._images = new Array();
    }

    PdfPage.prototype.setWidth = function (intParam) {
        this._width = intParam;
    };

    PdfPage.prototype.setHeight = function (intParam) {
        this._height = intParam;
    };

    PdfPage.prototype.addText = function (objParam) {
        objParam._y = this._height - objParam._y - objParam._fontSize;
        this._texts.push(objParam);
    };

    PdfPage.prototype.setRotation = function (intParam) {
        this._rotation = intParam;
    };

    PdfPage.prototype.addImage = function (objParam) {
        this._images.push(objParam);
    };

    function PdfText(x, y, fontName, fontSize, fontText) {
        this._x = x;
        this._y = y;
        this._fontName;
        var upperName = fontName.toUpperCase();
        if (upperName in FONTNAMES) {
            this._fontName = FONTNAMES[upperName];
        } else {
            this._fontName = FONTNAMES["ARIAL"];
        }
        this._fontSize = fontSize;
        this._fontText = fontText;
    }

    function PdfImage(x, y, imageData) {
        this._x = x;
        this._y = y;
        this._imageData = imageData;
    }

    function PdfResource(name, stream) {
        this._name = name;
        this._stream = stream;
    }

    function XFAStream(name, data) {
        this._name = name;
        this._data = data;
    }

    function getObjStart(id) {
        return id + " 0 obj";
    }

    function getObjRef(id) {
        return id + " 0 R";
    }

    function getCatalogString(id) {
        return getObjStart(id) + " <</Type /Catalog /Pages " + getObjRef(id + 1) + ">>\nendobj\n";
    }

    function getStructTreeString(id) {
        return getObjStart(id) + " <</Type /StructTreeRoot>>\nendobj\n";
    }

    function getXFACatalogString(id, xfaStart, sTreeIndex) {
        return getObjStart(id) + " <</NeedsRendering true/AcroForm " + getObjRef(xfaStart) +
                "/Extensions<</ADBE<</BaseVersion/1.7/ExtensionLevel 5>>>>" +
                "/MarkInfo<</Marked true>>/Type /Catalog /Pages " + getObjRef(id + 1) + ">>\nendobj\n";
    }

    function getPageTreeString(id, pageCount) {
        var str = getObjStart(id) + " <</Type /Pages /Kids [ ";
        var start = id + 1;
        for (var i = 0; i < pageCount; i++) {
            str += getObjRef(i + start) + " ";
        }
        str += "] /Count " + pageCount + ">>\nendobj\n";
        return str;
    }

    function getPageString(pageId, pageTreeStart, resourceStart, pageContentId, pdfPage) {
        return getObjStart(pageId) + " <</Type /Page /Parent " + getObjRef(pageTreeStart)
                + " /Resources " + getObjRef(resourceStart) + " /Contents " + getObjRef(pageContentId)
                + " /MediaBox [0 0 " + pdfPage._width + " " + pdfPage._height + "] /Rotate " + pdfPage._rotation
                + ">>\nendobj\n";
    }

    function getContentString(pageConentID, curPage) {
        var contentStr = "";
        var totalTexts = curPage._texts.length;
        for (var i = 0; i < totalTexts; i++) {
            var textObj = curPage._texts[i];
            contentStr += "BT /" + textObj._fontName + " " + textObj._fontSize + " Tf " + textObj._x + " " + textObj._y + " Td (" + textObj._fontText + ")Tj ET\n";
        }
        var tempArr = new Array();
        EcmaPDF.writeBytes(contentStr, tempArr);
        return getObjStart(pageConentID) + " <</Length " + tempArr.length + ">>\nstream\n" + contentStr + "\nendstream\nendobj\n";
    }

    function getResourceString(resourceStart, resourceLen, pdfDoc) {
        var str = getObjStart(resourceStart) + " <</Font <<";
        for (var i = 0; i < resourceLen; i++) {
            var rFont = pdfDoc._fontResources[i];
            str += "/" + rFont._name + " " + getObjRef(resourceStart + 1 + i) + " ";
        }
        str += ">> >>\nendObj\n";
        return str;
    }

    function getFontDefString(fontID, pdfResource) {
        //note the stream already contains dictionary tags
        return getObjStart(fontID) + pdfResource._stream + "\nendobj\n";
    }

    function getZeroLead(num) {
        var numStr = "" + num;
        var balance = 10 - numStr.length;
        for (var i = 0; i < balance; i++) {
            numStr = "0" + numStr;
        }
        return numStr;
    }

    function getXrefString(xRef) {
        var len = xRef.length;
        var str = "xref\n0 " + (len + 1) + "\n0000000000 65535 f \n";
        for (var i = 0; i < len; i++) {
            str += getZeroLead(xRef[i]) + " 00000 n \n";
        }
        return str;
    }

    function getXFADefinitionString(id, xfaTempID) {
        return getObjStart(id) + "\n<</XFA " + getObjRef(xfaTempID) + "/Fields[]>>\nendobj\n";
    }

    function getXFATemplateString(id, sLen, tempStr) {
        return getObjStart(id) + "\n<</Length " + sLen + ">>stream\n" + tempStr + "\nendstream\nendobj\n";
    }

    PdfDocument.prototype.createPdfString = function (xdpStr) {

//    var sss = "10 0 obj <</Type /page /subtype /cool /Annot [7 0 R 13 0 R 18 0 R]/font <</matrix [0 0 0]>>>>\nStream ";
//    var ddd = new Array();
//    EcmaPDF.writeBytes(sss,ddd);
//    console.log(EcmaPDF.getDictionaryString(ddd,0));
        var xRef = new Array();
        var pdfData = new Array();
        var pageCount = this._pages.length;
        var docStart = 1, pageTreeStart = 2, pageStart = 3;
        var contentStart = pageStart + pageCount;
        var resourcesStart = contentStart + pageCount;
        var fontResourceStart = resourcesStart + 1;
        var fontResLen = this._fontResources.length;
        var sTreeIndex = fontResourceStart + fontResLen;
        var xfaDefStart = sTreeIndex;

        //writeout version
        EcmaPDF.writeBytes("%PDF-1.7\n", pdfData);
        //writeout catalog
        var temp = null;
        if (xdpStr) {
            temp = getXFACatalogString(docStart, xfaDefStart, sTreeIndex);
        } else {
            temp = getCatalogString(docStart);
        }

        xRef.push(pdfData.length);
        EcmaPDF.writeBytes(temp, pdfData);
        //writeout pagetree
        temp = getPageTreeString(pageTreeStart, pageCount);
        xRef.push(pdfData.length);
        EcmaPDF.writeBytes(temp, pdfData);
        //add pages 
        for (var i = 0; i < pageCount; i++) {
            var curPage = this._pages[i];
            var pageID = pageStart + i;
            var pageConentID = contentStart + i;
            temp = getPageString(pageID, pageTreeStart, resourcesStart, pageConentID, curPage);
            xRef.push(pdfData.length);
            EcmaPDF.writeBytes(temp, pdfData);
        }
        //add page contents
        for (var i = 0; i < pageCount; i++) {
            var curPage = this._pages[i];
            var pageConentID = contentStart + i;
            temp = getContentString(pageConentID, curPage);
            xRef.push(pdfData.length);
            EcmaPDF.writeBytes(temp, pdfData);
        }
        // add Resources
        temp = getResourceString(resourcesStart, fontResLen, this);
        xRef.push(pdfData.length);
        EcmaPDF.writeBytes(temp, pdfData);
        //add each font dictionary
        for (var i = 0; i < fontResLen; i++) {
            temp = getFontDefString(fontResourceStart + i, this._fontResources[i]);
            xRef.push(pdfData.length);
            EcmaPDF.writeBytes(temp, pdfData);
        }

        if (xdpStr) {
            var xfaTemplateStart = xfaDefStart + 1;
            temp = getXFADefinitionString(xfaDefStart, xfaTemplateStart);
            xRef.push(pdfData.length);
            EcmaPDF.writeBytes(temp, pdfData);

            var tb = new Array();
            EcmaPDF.writeBytes(xdpStr, tb);

            temp = getXFATemplateString(xfaTemplateStart, tb.length, xdpStr);
            xRef.push(pdfData.length);
            EcmaPDF.writeBytes(temp, pdfData);
        }

        var xRefStart = pdfData.length;
        //add xref table
        temp = getXrefString(xRef);
        EcmaPDF.writeBytes(temp, pdfData);
        //add trailer
        temp = "trailer <</Size " + (xRef.length + 1) + " /Root 1 0 R>>\nstartxref\n" + xRefStart + "\n%%EOF";
        EcmaPDF.writeBytes(temp, pdfData);
        return EcmaPDF.bytesToString(pdfData);
    };
}

var app = idrform.app;

function printPdf(filename) {
    idrform.app.execMenuItem('SaveAs', filename)
}