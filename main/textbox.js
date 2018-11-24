var j = jQuery.noConflict();

j.fn.textWidth = function(text, font) {
    
    if (!j.fn.textWidth.fakeEl) j.fn.textWidth.fakeEl = j('<span>').hide().appendTo(document.body);
    
    j.fn.textWidth.fakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));
    
    return j.fn.textWidth.fakeEl.width();
};

j('.width-dynamic').on('input', function() {
    var inputWidth = j(this).textWidth();
    j(this).css({
        width: inputWidth + 50
    })
}).trigger('input');


function inputWidth(elem, minW, maxW) {
    elem = j(this);
    console.log(elem)
}

var targetElem = j('.width-dynamic');

inputWidth(targetElem);