"use strict";

const dom = {
    container: $('#mask-header'),
}

const cls = {
    wrapper: '.mask-img__container',
    project: '.mask-img__box',
    arrow: {
        arr: '.mask-img__arrow',
        prev: '.mask-img__arrow--prev',
        next: '.mask-img__arrow--next'
    }
}

var Core;
(function (Core) {
    var Slider = (function () {
        function Slider() {
            // Durations
            this.durations = {
                auto: 2000,
                slide: 1400
            };
            // DOM
            this.dom = {
                wrapper: null,
                container: null,
                project: null,
                current: null,
                next: null,
                arrow: null
            };
            // Misc stuff
            this.length = 0
            this.current = 0
            this.next = 0
            this.isAuto = true
            this.working = false
            this.dom.container = dom.container
            this.dom.wrapper = dom.container.find(cls.wrapper)
            this.dom.project = this.dom.wrapper.find(cls.project)
            this.dom.arrow = this.dom.wrapper.find(cls.arrow.arr)
            this.length = this.dom.project.length
            this.init()
            this.events()
            this.auto = setInterval(this.updateNext.bind(this), this.durations.auto)
        }
        /**
         * Set initial z-indexes & get current project
         */
        Slider.prototype.init = function () {
            this.dom.project.css('z-index', 10);
            this.dom.current = $(this.dom.project[this.current]);
            this.dom.next = $(this.dom.project[this.current + 1]);
            this.dom.current.css('z-index', 30);
            this.dom.next.css('z-index', 20);
        };
        Slider.prototype.clear = function () {
            this.dom.arrow.off('click');
            if (this.isAuto)
                clearInterval(this.auto);
        };
        /**
         * Initialize events
         */
        Slider.prototype.events = function () {
            var self = this;
            this.dom.arrow.on('click', function () {
                if (self.working)
                    return;
                self.processBtn($(this));
            });
        };
        Slider.prototype.processBtn = function (btn) {
            if (this.isAuto) {
                this.isAuto = false;
                clearInterval(this.auto);
            }

            if (btn.hasClass(cls.arrow.next.replace('.', '')))
                this.updateNext();
            if (btn.hasClass(cls.arrow.prev.replace('.', '')))
                this.updatePrevious();
        };
        /**
         * Update next global index
         */
        Slider.prototype.updateNext = function () {
            this.next = (this.current + 1) % this.length;
            this.process();
        };
        /**
         * Update next global index
         */
        Slider.prototype.updatePrevious = function () {
            this.next--;
            if (this.next < 0)
                this.next = this.length - 1;
            this.process();
        };
        /**
         * Process, calculate and switch beetween slides
         */
        Slider.prototype.process = function () {
            var self = this;
            this.working = true;
            this.dom.next = $(this.dom.project[this.next]);
            this.dom.current.css('z-index', 30);
            self.dom.next.css('z-index', 20);
            // Hide current
            this.dom.current.addClass('hide');
            setTimeout(function () {
                self.dom.current.css('z-index', 10);
                self.dom.next.css('z-index', 30);
                self.dom.current.removeClass('hide');
                self.dom.current = self.dom.next;
                self.current = self.next;
                self.working = false;
            }, this.durations.slide);
        };
        return Slider;
    }());
    Core.Slider = Slider;
})(Core || (Core = {}));


document.addEventListener('DOMContentLoaded', function () {
    var imgLoad0 = imagesLoaded( cls.wrapper, { background: true })
    imgLoad0.on( 'done', function() {
      new Core.Slider()
    })
})


// class Slider {
//     constructor() {
//         // Durations
//         this.durations = {
//             auto: 2000,
//             slide: 1400
//         }
//         // DOM
//         this.dom = {
//             wrapper: null,
//             container: null,
//             project: null,
//             current: null,
//             next: null,
//             arrow: null
//         }
//         // Misc stuff
//         this.length = 0
//         this.current = 0
//         this.next = 0
//         this.isAuto = true
//         this.working = false
//         this.dom.container = dom.container
//         this.dom.wrapper = dom.container.find(cls.wrapper)
//         this.dom.project = this.dom.wrapper.find(cls.project)
//         this.dom.arrow = this.dom.wrapper.find(cls.arrow.arr)
//         this.length = this.dom.project.length
//         this.init()
//         this.events()
//         this.auto = setInterval(this.updateNext.bind(this), this.durations.auto)
//     }

//     /**
//      * Set initial z-indexes & get current project
//      */
//     init() {
//         this.dom.project.css('z-index', 10)
//         this.dom.current = $(this.dom.project[this.current])
//         this.dom.next = $(this.dom.project[this.current + 1])
//         this.dom.current.css('z-index', 30)
//         this.dom.next.css('z-index', 20)
//     }
//     clear() {
//         this.dom.arrow.off('click')
//         if (this.isAuto)
//             clearInterval(this.auto)
//     }

//     /**
//      * Initialize events
//      */
//     events() {
//         var self = this
//         this.dom.arrow.on('click', function () {
//             if (self.working) return
//             self.processBtn($(this))
//             console.log(self.working)
//         })
//     }
//     processBtn(btn) {
//         if (this.isAuto) {
//             this.isAuto = false
//             clearInterval(this.auto)
//         }
//         !btn.hasClass(cls.arrow.next) || this.updateNext()
//         !btn.hasClass(cls.arrow.prev) || this.updatePrevious()
//     }

//     /**
//      * Update next global index
//      */
//     updateNext() {
//         this.next = (this.current + 1) % this.length
//         this.process()
//     }

//     /**
//      * Update next global index
//      */
//     updatePrevious() {
//         this.next--
//         if (this.next < 0) this.next = this.length - 1
//         this.process()
//     }

//     /**
//      * Process, calculate and switch beetween slides
//      */
//     process() {
//         var self = this
//         this.working = true
//         this.dom.next = $(this.dom.project[this.next])
//         this.dom.current.css('z-index', 30)
//         self.dom.next.css('z-index', 20)
//         // Hide current
//         this.dom.current.addClass('hide')
//         setTimeout(function () {
//             self.dom.current.css('z-index', 10)
//             self.dom.next.css('z-index', 30)
//             self.dom.current.removeClass('hide')
//             self.dom.current = self.dom.next
//             self.current = self.next
//             self.working = false
//         }, this.durations.slide)
//     }
// }

// $(document).on('DOMContentLoaded', function () {
//     const imgLoad0 = imagesLoaded( cls.wrapper, { background: true } )
//     imgLoad0.on( 'done', function() { new Slider() })
// })