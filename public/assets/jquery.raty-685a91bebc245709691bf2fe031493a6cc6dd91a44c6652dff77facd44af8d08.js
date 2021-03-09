!function(t,e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=e(require("jquery")):e(t.jQuery)}(this,function(r){"use strict";var t;r.raty={cancelButton:!1,cancelClass:"raty-cancel",cancelHint:"Cancel this rating!",cancelOff:"/assets/cancel-off-5758f74356b87443c8dd8d07a98b4be8b9e5b0a6304baf27bbd2b99d8e02d01c.png",cancelOn:"/assets/cancel-on-52afce0580c4df0b09e2302d54750e9d7b882b7c6c6847a16c98f606b2451389.png",cancelPlace:"left",click:undefined,half:!1,halfShow:!0,hints:["bad","poor","regular","good","gorgeous"],iconRange:undefined,mouseout:undefined,mouseover:undefined,noRatedMsg:"Not rated yet!",number:5,numberMax:20,path:undefined,precision:!1,readOnly:!1,round:{down:.25,full:.6,up:.76},score:undefined,scoreName:"score",single:!1,space:!0,starHalf:"/assets/star-half-808ffaeee4006e4930f89f5dcf46f603eb173ecc365b8f3df2b822bb6747c0b8.png",starOff:"/assets/star-off-cf9b07584547d5d561dfac9cdbf7b6a530cb72a1b7a1096411966036c4017d38.png",starOn:"/assets/star-on-88233ad1abcd2282b53edb9465a6bef42fd32de319f014e4059353e4fd8a7e0a.png",starType:"img",target:undefined,targetFormat:"{score}",targetKeep:!1,targetScore:undefined,targetText:"",targetType:"hint"},r.fn.raty=function(t){return this.each(function(){return new r.raty.Raty(this,t)._create()})},r.raty.Raty=((t=function(t,e){this.element=t,this.self=r(t),this.opt=r.extend(!0,{},r.raty,e,this.self.data())}).prototype={_create:function(){this._executeCallbacks(),this._adjustNumber(),this._adjustHints(),this.opt.score=this._adjustedScore(this.opt.score),"img"!==this.opt.starType&&this._adjustStarName(),this._setPath(),this._createStars(),this.opt.cancelButton&&this._createCancel(),this.opt.precision&&this._adjustPrecision(),this._createScore(),this._apply(this.opt.score),this._setTitle(this.opt.score),this._target(this.opt.score),this.opt.readOnly?this._lock():(this.element.style.cursor="pointer",this._binds()),this.self.data("raty",this)},_adjustedScore:function(t){if(t||0===t)return this._between(t,0,this.opt.number)},_adjustHints:function(){if(this.opt.hints||(this.opt.hints=[]),this.opt.halfShow||this.opt.half)for(var t=this.opt.precision?10:2,e=0;e<this.opt.number;e++){var s=this.opt.hints[e];"[object Array]"!==Object.prototype.toString.call(s)&&(s=[s]),this.opt.hints[e]=[];for(var i=0;i<t;i++){var n=s[i],a=s[s.length-1];a===undefined&&(a=null),this.opt.hints[e][i]=n===undefined?a:n}}},_adjustNumber:function(){this.opt.number=this._between(this.opt.number,1,this.opt.numberMax)},_adjustPrecision:function(){this.opt.half=!0},_adjustStarName:function(){var t=["cancelOff","cancelOn","starHalf","starOff","starOn"];this.opt.path="";for(var e=0;e<t.length;e++)this.opt[t[e]]=this.opt[t[e]].replace(".","-")},_apply:function(t){this._fill(t),t&&(0<t&&this.scoreField.val(t),this._roundStars(t))},_attributesForIndex:function(t){var e=this._nameForIndex(t),s={alt:t,src:this.opt.path+this.opt[e]};return"img"!==this.opt.starType&&(s={"data-alt":t,"class":this.opt[e]}),s.title=this._getHint(t),s},_between:function(t,e,s){return Math.min(Math.max(parseFloat(t),e),s)},_binds:function(){this.cancelButton&&(this._bindOverCancel(),this._bindClickCancel(),this._bindOutCancel()),this._bindOver(),this._bindClick(),this._bindOut()},_bindClick:function(){var i=this;this.stars.on("click.raty",function(t){if(!i.self.data("readonly")){var e=!0,s=i.opt.half||i.opt.precision?i.self.data("score"):this.alt||r(this).data("alt");i.opt.half&&!i.opt.precision&&(s=i._roundHalfScore(s)),i.opt.click&&(e=i.opt.click.call(i.element,+s,t)),(e||e===undefined)&&i._apply(+s)}})},_bindClickCancel:function(){this.cancelButton.on("click.raty",function(t){this.scoreField.removeAttr("value"),this.opt.click&&this.opt.click.call(this.element,null,t)}.bind(this))},_bindOut:function(){this.self.on("mouseleave.raty",function(t){var e=+this.scoreField.val()||undefined;this._apply(e),this._target(e,t),this._resetTitle(),this.opt.mouseout&&this.opt.mouseout.call(this.element,e,t)}.bind(this))},_bindOutCancel:function(){var i=this;this.cancelButton.on("mouseleave.raty",function(t){var e=i.opt.cancelOff;if("img"!==i.opt.starType&&(e=i.opt.cancelClass+" "+e),i._setIcon(this,e),i.opt.mouseout){var s=+i.scoreField.val()||undefined;i.opt.mouseout.call(i.element,s,t)}})},_bindOver:function(){var s=this,t=s.opt.half?"mousemove.raty":"mouseover.raty";this.stars.on(t,function(t){var e=s._getScoreByPosition(t,this);s._fill(e),s.opt.half&&(s._roundStars(e,t),s._setTitle(e,t),s.self.data("score",e)),s._target(e,t),s.opt.mouseover&&s.opt.mouseover.call(s.element,e,t)})},_bindOverCancel:function(){var i=this;this.cancelButton.on("mouseover.raty",function(t){if(!i.self.data("readonly")){var e=i.opt.path+i.opt.starOff,s=i.opt.cancelOn;"img"===i.opt.starType?i.stars.attr("src",e):(s=i.opt.cancelClass+" "+s,i.stars.attr("class",e)),i._setIcon(this,s),i._target(null,t),i.opt.mouseover&&i.opt.mouseover.call(i.element,null)}})},_buildScoreField:function(){return r("<input />",{name:this.opt.scoreName,type:"hidden"}).appendTo(this.self)},_createCancel:function(){var t=this.opt.path+this.opt.cancelOff,e=r("<"+this.opt.starType+" />",{title:this.opt.cancelHint,"class":this.opt.cancelClass});"img"===this.opt.starType?e.attr({src:t,alt:"x"}):e.attr("data-alt","x").addClass(t),"left"===this.opt.cancelPlace?this.self.prepend("&#160;").prepend(e):this.self.append("&#160;").append(e),this.cancelButton=e},_createScore:function(){var t=r(this.opt.targetScore);this.scoreField=t.length?t:this._buildScoreField()},_createStars:function(){for(var t=1;t<=this.opt.number;t++){var e=this._attributesForIndex(t);r("<"+this.opt.starType+" />",e).appendTo(this.element),this.opt.space&&t<this.opt.number&&this.self.append("&#160;")}this.stars=this.self.children(this.opt.starType)},_error:function(t){r(this).text(t),r.error(t)},_executeCallbacks:function(){for(var t=["number","readOnly","score","scoreName","target","path"],e=0;e<t.length;e++)if("function"==typeof this.opt[t[e]]){var s=this.opt[t[e]].call(this.element);s?this.opt[t[e]]=s:delete this.opt[t[e]]}},_fill:function(t){for(var e=0,s=1;s<=this.stars.length;s++){var i,n=this.stars[s-1],a=this._turnOn(s,t);if(this.opt.iconRange&&this.opt.iconRange.length>e){var o=this.opt.iconRange[e];i=this._getRangeIcon(o,a),s<=o.range&&this._setIcon(n,i),s===o.range&&e++}else i=this.opt[a?"starOn":"starOff"],this._setIcon(n,i)}},_getDecimal:function(t,e){var s=t.toString().split(".")[1],i=0;return s&&(i=parseInt(s.slice(0,e),10),"9999"===s.slice(1,5)&&i++),i},_getRangeIcon:function(t,e){return e?t.on||this.opt.starOn:t.off||this.opt.starOff},_getScoreByPosition:function(t,e){var s=parseInt(e.alt||e.getAttribute("data-alt"),10);if(this.opt.half){var i=this._getWidth();s=s-1+parseFloat((t.pageX-r(e).offset().left)/i)}return s},_getHint:function(t,e){if(0!==t&&!t)return this.opt.noRatedMsg;var s=this._getDecimal(t,1),i=Math.ceil(t),n=this.opt.hints[(i||1)-1],a=n,o=!e||this.isMove;return this.opt.precision?(o&&(s=0===s?9:s-1),a=n[s]):(this.opt.halfShow||this.opt.half)&&(a=n[s=o&&0===s?1:5<s?1:0]),""===a?"":a||t},_getWidth:function(){var t=this.stars[0].width||parseFloat(this.stars.eq(0).css("font-size"));return t||this._error("Could not get the icon width!"),t},_lock:function(){var t=this._getHint(this.scoreField.val());this.element.style.cursor="",this.element.title=t,this.scoreField.prop("readonly",!0),this.stars.prop("title",t),this.cancelButton&&this.cancelButton.hide(),this.self.data("readonly",!0)},_nameForIndex:function(t){return this.opt.score&&this.opt.score>=t?"starOn":"starOff"},_resetTitle:function(){for(var t=0;t<this.opt.number;t++)this.stars[t].title=this._getHint(t+1)},_roundHalfScore:function(t){var e=parseInt(t,10),s=this._getDecimal(t,1);return 0!==s&&(s=5<s?1:.5),e+s},_roundStars:function(t,e){var s=this._starName(t,e);if(s){var i=this.opt[s],n=this.stars[Math.ceil(t)-1];this._setIcon(n,i)}},_setIcon:function(t,e){t["img"===this.opt.starType?"src":"className"]=this.opt.path+e},_setPath:function(){this.opt.path=this.opt.path||"",this.opt.path&&"/"!==this.opt.path.slice(-1)[0]&&(this.opt.path+="/")},_setTarget:function(t,e){e&&(e=this.opt.targetFormat.toString().replace("{score}",e)),t.is(":input")?t.val(e):t.html(e)},_setTitle:function(t,e){if(t){var s=parseInt(Math.ceil(t),10);this.stars[s-1].title=this._getHint(t,e)}},_starName:function(t,e){var s=+(t%1).toFixed(2);return e||this.isMove?.5<s?"starOn":"starHalf":s<=this.opt.round.down?void 0:this.opt.halfShow&&s<this.opt.round.up?"starHalf":s<this.opt.round.full?"starOff":"starOn"},_target:function(t,e){if(this.opt.target){var s=r(this.opt.target);s.length||this._error("Target selector invalid or missing!");var i=e&&"mouseover"===e.type;if(t===undefined)t=this.opt.targetText;else if(null===t)t=i?this.opt.cancelHint:this.opt.targetText;else{"hint"===this.opt.targetType?t=this._getHint(t,e):this.opt.precision&&(t=parseFloat(t).toFixed(1));var n=e&&"mousemove"===e.type;i||n||this.opt.targetKeep||(t=this.opt.targetText)}this._setTarget(s,t)}},_turnOn:function(t,e){return this.opt.single?t===e:t<=e},_unlock:function(){this.element.style.cursor="pointer",this.element.removeAttribute("title"),this.scoreField.removeAttr("readonly"),this.self.data("readonly",!1),this._resetTitle(),this.cancelButton&&this.cancelButton.css("display","")},cancel:function(t){!0!==this.self.data("readonly")&&(this[t?"click":"score"].call(this,null),this.scoreField.removeAttr("value"))},click:function(t){!0!==this.self.data("readonly")&&(t=this._adjustedScore(t),this._apply(t),this.opt.click&&this.opt.click.call(this.element,t,r.Event("click")),this._target(t))},getScore:function(){var t,e=[];return t=this.scoreField.val(),e.push(t?+t:undefined),1<e.length?e:e[0]},move:function(t){var e=parseInt(t,10),s=this._getDecimal(t,1);e>=this.opt.number&&(e=this.opt.number-1,s=10);var i=this._getWidth()/10,n=r(this.stars[e]),a=n.offset().left+i*s,o=r.Event("mousemove",{pageX:a});this.isMove=!0,n.trigger(o),this.isMove=!1},readOnly:function(t){this.self.data("readonly")!==t&&(t?(this.self.off(".raty").children(this.opt.starType).off(".raty"),this._lock()):(this._binds(),this._unlock()),this.self.data("readonly",t))},score:function(){return arguments.length?this.setScore.apply(this,arguments):this.getScore()},setScore:function(t){!0!==this.self.data("readonly")&&(t=this._adjustedScore(t),this._apply(t),this._target(t))}},t)});