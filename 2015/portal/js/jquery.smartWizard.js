/*
 * SmartWizard 3.3.1 plugin
 * jQuery Wizard
 * 
 */

 

		 
		 
 // Global variables
 

 var key = [
		["General Leadership","A", "Give more thought to my responsibilities as a leader.", 18],
		["General Leadership","B", "Assume a more aggressive role as a decision maker/problem solver.", 13],
		["General Leadership","C", "Seek a better understanding of the work I am ultimately responsible for", 8],
		["General Leadership","D", "Pro-actively establish my leadership role and position through communications with other functions.", 9],
		["General Leadership","E", "Assume personal responsibility for the performance of direct reports.", 10],
		["General Leadership","F", "Seek background information to better understand issues that impact my role as a manager/leader.", 12],
		["General Leadership","G", "Initiate interactions with peers that would foster teamwork/cooperation.", 10],
		["General Leadership","H", "Keep my director better informed.", 7],
		["Individual Leadership","I", "Take advantage of opportunities to express interest in or assume responsibility for the role of coach or counsellor", 4],
		["Individual Leadership","J", "Provide positive reinforcement and feedback to direct reports.", 5],
		["Individual Leadership","K", "Purposefully convey intent to stay informed of performance of direct reports.", 6],
		["Individual Leadership","L", "Act, plan or convey intent to address inappropriate or questionable performance of direct reports.", 4],
		["Individual Leadership","M", "Consider what my direct reports might need/expect from a new leader.", 6],
		["Individual Leadership","N", "Express confidence in my team/direct reports.", 4],
		["Individual Leadership","O", "Convey intent to establish/maintain high performance standards of my unit.", 15],
		["Communication","P", "Provide clear and detailed direction to direct reports.", 6],
		["Communication","Q", "Establish proper “distance” between myself and direct reports.", 6],
		["Communication","R", "Convey a managerial perspective on important issues.", 10]
	];
	
	
	
var leadershipType = ["General Leadership", "Individual Leadership", "Communication"];
	
var letterArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R"];
var temp = new Array();
var checkbox = [];
var myfName = "";


// Clear web storage
function clear() {
	localStorage.clear();
}
//clear();

function getNotes(){
	var  commentArray = [];
	var x = document.getElementsByName("comments");
		for (var cnt = 0; cnt < x.length; cnt++) {
			if (x[cnt].type == "textarea") commentArray.push(x[cnt]);
		}
		return commentArray;
}

function getCheckboxes(){
	checkbox = document.querySelectorAll("input[type='checkbox']");
			/* for(var i = 0; i < checkbox.length; i++) {
				localStorage.getItem(checkbox[i].id, checkbox[i].checked);
			} */
}


/* function loadUserCheckBoxes() {
	checkbox = document.querySelectorAll("input[type='checkbox']");
		for(var i = 0; i < checkbox.length; i++) {
			localStorage.getItem(checkbox[i].id, checkbox[i].checked);
		}
} */






/* function saveUserData() {
	var fn = document.getElementById('firstname').value;
	localStorage.setItem("myfName", fn);
	var ln = document.getElementById('lastname').value;
	localStorage.setItem('mylName', ln);
	var userEmail = document.getElementById('email').value;
	 localStorage.setItem('myEmail', userEmail);
 }*/

function saveUserCheckBoxes() {
	checkbox = document.querySelectorAll("input[type='checkbox']");
		for(var i = 0; i < checkbox.length; i++) {
			localStorage.setItem(checkbox[i].id, checkbox[i].checked);
		}
}

// Count occurrences of letters
function countOccurrences(regex, str) {
    var count = 0;
		while (regex.test(str)) count++;
		return count;
}

// Print page function
function printDiv(divID) {
	//Get the HTML of div
	var divElements = document.getElementById(divID).innerHTML;
	//Get the HTML of whole page
	var oldPage = document.body.innerHTML;

	//Reset the page's HTML with div's HTML only
	document.body.innerHTML = 
	  "<html><head><title></title></head><body>" + 
	  divElements + "</body>";

	//Print Page
	window.print();

	//Restore original HTML
	document.body.innerHTML = oldPage;
}

// start of code

function SmartWizard(target, options) {
	this.target       = target;
    this.options      = options;
    this.curStepIdx   = options.selected;
    this.steps        = $(target).children("ul").children("li").children("a"); // Get all anchors
    this.contentWidth = 0;
    this.msgBox = $('<div class="msgBox"><div class="content"></div><a href="#" class="close">X</a></div>');
    this.elmStepContainer = $('<div></div>').addClass("stepContainer");
    this.loader = $('<div>Loading</div>').addClass("loader");
    this.buttons = {
        next : $('<a>' + options.labelNext + '</a>').attr("href", "#").addClass("buttonNext"),
        previous : $('<a>' + options.labelPrevious + '</a>').attr("href", "#").addClass("buttonPrevious"),
        finish  : $('<a>' + options.labelFinish + '</a>').attr("href", "#").addClass("buttonFinish")
    };

    // Private functions
	var _init = function($this) {
			var elmActionBar = $('<div></div>').addClass("actionBar");
			elmActionBar.append($this.msgBox);
			$('.close',$this.msgBox).click(function() {
				$this.msgBox.fadeOut("normal");
				return false;
			});

			var allDivs = $this.target.children('div');
			// Check if ul with steps has been added by user, if not add them
			if($this.target.children('ul').length === 0) {
				var ul = $("<ul/>");
				target.prepend(ul);

				// for each div create a li
				allDivs.each(function(i, e) {
					var title = $(e).first().children(".StepTitle").text();
					var s = $(e).attr("id");
					// if referenced div has no id, add one.
					if (s === undefined) {
						s = "step-" + (i + 1);
						$(e).attr("id", s);
					}
					var span = $("<span/>").addClass("stepDesc").text(title);
					var li = $("<li></li>").append($("<a></a>").attr("href", "#" + s).append($("<label></label>").addClass("stepNumber").text(i + 1)).append(span));
					ul.append(li);
				});
				
				// (re)initialise the steps property
				$this.steps = $(target).children("ul").children("li").children("a"); // Get all anchors
			}
			$this.target.children('ul').addClass("anchor");
			allDivs.addClass("content");

			// highlight steps with errors
			if ($this.options.errorSteps && $this.options.errorSteps.length > 0) {
				$.each($this.options.errorSteps, function(i, n) {
					$this.setError({stepnum: n, iserror: true});
				});
			}
			$this.elmStepContainer.append(allDivs);
			elmActionBar.append($this.loader);
			$this.target.append($this.elmStepContainer);

			if ($this.options.includeFinishButton) {
				elmActionBar.append($this.buttons.finish);
			}
			elmActionBar.append($this.buttons.next)
				.append($this.buttons.previous);
			$this.target.append(elmActionBar);
			this.contentWidth = $this.elmStepContainer.width();

			
// Next button clicked
			$($this.buttons.next).click(function() {
			
// Save user checkboxes
			/* saveUserData();
			saveUserCheckBoxes(); */
				
				
			$this.goForward();
			return false;
		});
			
		
		
		// Go through and get checkboxes
		getCheckboxes();
		
		
		
	

			
	// Finish Click
	$($this.buttons.finish).click(function() {
		var fnameValue = document.getElementById('firstname').value;
		var lnameValue = document.getElementById('lastname').value;
		var resultsString = "";	
		var sec1 = false;
		var sec2 = false;
		var sec3 = false;
		var  commentArray = getNotes();
	
		document.getElementById('notesSection').innerHTML = "";
		document.getElementById('enhance').innerHTML = ""; 

		// Compile the report
		document.getElementById('nameSpace').innerHTML = fnameValue + " " + lnameValue;
		
		for (var i = 0; i < commentArray.length; i++) {
			
			var issues = ["The new GPD is an unknown quantity to both the marketing team and agency personnel.",
				"A teamwork/interaction problem between marketing and agency personnel.",
				"The director of marketing’s disagreement with a PM’s idea about how to improve a product’s sales.",
				"(With Items 2 and 5) PM appears to be too easily distracted from primary responsibilities.",
				"A teamwork/interaction problem with the agency and marketing personnel.",
				"A possible PM efficiency/focus issue.",
				"A major conflict with a staff function on an important issue. Concern from the agency lead about project creep.",
				"A well intended but misguided idea from the sales force."
			];
	
	
			if (commentArray[i].value !== "") {
				if (i == 0) {
					document.getElementById('notesSection').innerHTML += "<b>Item Intro Issue: </b>" + issues[i] + "<br>";
					 var textString = commentArray[i].value;
					document.getElementById('notesSection').innerHTML += commentArray[i].value + "<br><br>";
				} else {
				document.getElementById('notesSection').innerHTML += "<b>Item " + i + " Issue:</b> " + issues[i] + "<br>";
				document.getElementById('notesSection').innerHTML += commentArray[i].value + "<br><br>";
				} 
			}
		}
		
		for (var k = 0; k < checkbox.length; k++) {
			if (checkbox[k].checked) {
				value = checkbox[k].value; // get value
			} else {
				value = ""; 
			}
				
			resultsString += value;						
		}
		
		for(var i = 0; i < letterArray.length; i++) {
			var lookForThis = letterArray[i];
			var regex = new RegExp(lookForThis, "gi");
			var count = countOccurrences(regex,resultsString);
			
			if (count <= (key[i][3]) * .75) {
				if (i <= 7) {
					if (sec1==false) {
						document.getElementById('enhance').innerHTML += "<br><b>" + leadershipType[0] + "</b>" + "<br>";
						sec1 = true;
					}
				} else if (i <= 14) {
					if (sec2==false){
						document.getElementById('enhance').innerHTML += "<br><b>" + leadershipType[1] + "</b>" + "<br>";
						sec2 = true;
					}						
				} else {
					if (sec3==false) {
						document.getElementById('enhance').innerHTML += "<br><b>" + leadershipType[2] + "</b>" + "<br>";
						sec3 = true;
					}
				} 
		
				document.getElementById('enhance').innerHTML += "&#8226; " + key[i][2] + "<br>"; 
			}

		}			
	


		if(!$(this).hasClass('buttonDisabled')) {
			if($.isFunction($this.options.onFinish)) {
				var context = { fromStep: $this.curStepIdx + 1 };
				if(!$this.options.onFinish.call(this,$($this.steps), context)) {
					return false;
				}
			} else {
				var frm = $this.target.parents('form');
				if(frm && frm.length){
					frm.submit();
				}
			}
		}
			
		return false;  
	});

        
		
		
		
		$($this.steps).bind("click", function(e){
            if($this.steps.index(this) == $this.curStepIdx){
                return false;
            }
            var nextStepIdx = $this.steps.index(this);
            var isDone = $this.steps.eq(nextStepIdx).attr("isDone") - 0;
            if(isDone == 1){
                _loadContent($this, nextStepIdx);
            }
            return false;
        });

 
        //  Prepare the steps
        _prepareSteps($this);
        // Show the first selected step
        _loadContent($this, $this.curStepIdx);
		
    };

    var _prepareSteps = function($this) {
	
	
        if(! $this.options.enableAllSteps){
            $($this.steps, $this.target).removeClass("selected").removeClass("done").addClass("disabled");
            $($this.steps, $this.target).attr("isDone",0);
        }else{
            $($this.steps, $this.target).removeClass("selected").removeClass("disabled").addClass("done");
            $($this.steps, $this.target).attr("isDone",1);
        }

        $($this.steps, $this.target).each(function(i){
            $($(this).attr("href").replace(/^.+#/, '#'), $this.target).hide();
            $(this).attr("rel",i+1);
        });
    };

    var _step = function($this, selStep) {
        return $(
            $(selStep, $this.target).attr("href").replace(/^.+#/, '#'),
            $this.target
        );
    };


		
       
    var _loadContent = function($this, stepIdx) {
	
	var selStep = $this.steps.eq(stepIdx);
        var ajaxurl = $this.options.contentURL;
        var ajaxurl_data = $this.options.contentURLData;
        var hasContent = selStep.data('hasContent');
        var stepNum = stepIdx+1;
        if (ajaxurl && ajaxurl.length>0) {
            if ($this.options.contentCache && hasContent) {
                _showStep($this, stepIdx);
            } else {
                var ajax_args = {
                    url: ajaxurl,
                    type: $this.options.ajaxType,
                    data: ({step_number : stepNum}),
                    dataType: "text",
                    beforeSend: function(){
                        $this.loader.show();
                    },
                    error: function(){
                        $this.loader.hide();
                    },
                    success: function(res){
                        $this.loader.hide();
                        if(res && res.length>0){
                            selStep.data('hasContent',true);
                            _step($this, selStep).html(res);
                            _showStep($this, stepIdx);
                        }
                    }
                };
                if (ajaxurl_data) {
                    ajax_args = $.extend(ajax_args, ajaxurl_data(stepNum));
                }
                $.ajax(ajax_args);
            }
        }else{
            _showStep($this,stepIdx);
        }
    };

    var _showStep = function($this, stepIdx) {
        var selStep = $this.steps.eq(stepIdx);
        var curStep = $this.steps.eq($this.curStepIdx);
        if(stepIdx != $this.curStepIdx){
            if($.isFunction($this.options.onLeaveStep)) {
			    var context = { fromStep: $this.curStepIdx+1, toStep: stepIdx+1 };
                if (! $this.options.onLeaveStep.call($this,$(curStep), context)){
                    return false;
                }
            }
        }
        $this.elmStepContainer.height(_step($this, selStep).outerHeight());
        var prevCurStepIdx = $this.curStepIdx;
        $this.curStepIdx =  stepIdx;
        if ($this.options.transitionEffect == 'slide'){
            _step($this, curStep).slideUp("fast",function(e){
                _step($this, selStep).slideDown("fast");
                _setupStep($this,curStep,selStep);
            });
        } else if ($this.options.transitionEffect == 'fade'){
            _step($this, curStep).fadeOut("fast",function(e){
                _step($this, selStep).fadeIn("fast");
                _setupStep($this,curStep,selStep);
            });
        } else if ($this.options.transitionEffect == 'slideleft'){
            var nextElmLeft = 0;
            var nextElmLeft1 = null;
            var nextElmLeft = null;
            var curElementLeft = 0;
            if(stepIdx > prevCurStepIdx){
                nextElmLeft1 = $this.elmStepContainer.width() + 10;
                nextElmLeft2 = 0;
                curElementLeft = 0 - _step($this, curStep).outerWidth();
            } else {
                nextElmLeft1 = 0 - _step($this, selStep).outerWidth() + 20;
                nextElmLeft2 = 0;
                curElementLeft = 10 + _step($this, curStep).outerWidth();
            }
            if (stepIdx == prevCurStepIdx) {
                nextElmLeft1 = $($(selStep, $this.target).attr("href"), $this.target).outerWidth() + 20;
                nextElmLeft2 = 0;
                curElementLeft = 0 - $($(curStep, $this.target).attr("href"), $this.target).outerWidth();
            } else {
                $($(curStep, $this.target).attr("href"), $this.target).animate({left:curElementLeft},"fast",function(e){
                    $($(curStep, $this.target).attr("href"), $this.target).hide();
                });
            }

            _step($this, selStep).css("left",nextElmLeft1).show().animate({left:nextElmLeft2},"fast",function(e){
                _setupStep($this,curStep,selStep);
            });
        } else {
            _step($this, curStep).hide();
            _step($this, selStep).show();
            _setupStep($this,curStep,selStep);
        }
        return true;
    };

    var _setupStep = function($this, curStep, selStep) {
        $(curStep, $this.target).removeClass("selected");
        $(curStep, $this.target).addClass("done");

        $(selStep, $this.target).removeClass("disabled");
        $(selStep, $this.target).removeClass("done");
        $(selStep, $this.target).addClass("selected");

        $(selStep, $this.target).attr("isDone",1);

        _adjustButton($this);

        if($.isFunction($this.options.onShowStep)) {
            var context = { fromStep: parseInt($(curStep).attr('rel')), toStep: parseInt($(selStep).attr('rel')) };
            if(! $this.options.onShowStep.call(this,$(selStep),context)){
                return false;
            }
        }
        if ($this.options.noForwardJumping) {
            // +2 == +1 (for index to step num) +1 (for next step)
            for (var i = $this.curStepIdx + 2; i <= $this.steps.length; i++) {
                $this.disableStep(i);
            }
        }
    };

    var _adjustButton = function($this) {
        if (! $this.options.cycleSteps){
            if (0 >= $this.curStepIdx) {
                $($this.buttons.previous).addClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.previous).hide();
                }
            }else{
                $($this.buttons.previous).removeClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.previous).hide();
                }
            }
            if (($this.steps.length-1) <= $this.curStepIdx){
                $($this.buttons.next).addClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.next).hide();
                }
            }else{
                $($this.buttons.next).removeClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.next).show();
                }
            }
        }
        
		
	// Finish Button
        $this.enableFinish($this.options.enableFinishButton);
    };

    // Public methods	 
	 
    SmartWizard.prototype.goForward = function(){
	
	
	
	
			
			


	
		var nextStepIdx = this.curStepIdx + 1;
        if (this.steps.length <= nextStepIdx){ 
            if (! this.options.cycleSteps){
                return false;
            }
            nextStepIdx = 0;
        }
        _loadContent(this, nextStepIdx);
		
    };

    SmartWizard.prototype.goBackward = function(){
        var nextStepIdx = this.curStepIdx-1;
        if (0 > nextStepIdx){
            if (! this.options.cycleSteps){
                return false;
            }
            nextStepIdx = this.steps.length - 1;
        }
        _loadContent(this, nextStepIdx);
    };

    SmartWizard.prototype.goToStep = function(stepNum){
        var stepIdx = stepNum - 1;
        if (stepIdx >= 0 && stepIdx < this.steps.length) {
            _loadContent(this, stepIdx);
        }
    };
	
	
    SmartWizard.prototype.enableStep = function(stepNum) {
        var stepIdx = stepNum - 1;
        if (stepIdx == this.curStepIdx || stepIdx < 0 || stepIdx >= this.steps.length) {
            return false;
        }
        var step = this.steps.eq(stepIdx);
        $(step, this.target).attr("isDone",1);
        $(step, this.target).removeClass("disabled").removeClass("selected").addClass("done");
    }
    SmartWizard.prototype.disableStep = function(stepNum) {
        var stepIdx = stepNum - 1;
        if (stepIdx == this.curStepIdx || stepIdx < 0 || stepIdx >= this.steps.length) {
            return false;
        }
        var step = this.steps.eq(stepIdx);
        $(step, this.target).attr("isDone",0);
        $(step, this.target).removeClass("done").removeClass("selected").addClass("disabled");
    }
    SmartWizard.prototype.currentStep = function() {
        return this.curStepIdx + 1;
    }

    SmartWizard.prototype.showMessage = function (msg) {
        $('.content', this.msgBox).html(msg);
        this.msgBox.show();
    }

    SmartWizard.prototype.enableFinish = function (enable) {
        // Control status of finish button dynamically
        // just call this with status you want
		
        this.options.enableFinishButton = enable;
        if (this.options.includeFinishButton){
            if (!this.steps.hasClass('disabled') || this.options.enableFinishButton){
                $(this.buttons.finish).removeClass("buttonDisabled");
                if (this.options.hideButtonsOnDisabled) {
                    $(this.buttons.finish).show();
                }
            }else{
                $(this.buttons.finish).addClass("buttonDisabled");
                if (this.options.hideButtonsOnDisabled) {
                    $(this.buttons.finish).hide();
                }
            }
        }
        return this.options.enableFinishButton;
		
    }

    SmartWizard.prototype.hideMessage = function () {
        this.msgBox.fadeOut("normal");
    }
    SmartWizard.prototype.showError = function(stepnum) {
        this.setError(stepnum, true);
    }
    SmartWizard.prototype.hideError = function(stepnum) {
        this.setError(stepnum, false);
    }
    SmartWizard.prototype.setError = function(stepnum,iserror) {
        if (typeof stepnum == "object") {
            iserror = stepnum.iserror;
            stepnum = stepnum.stepnum;
        }

        if (iserror){
            $(this.steps.eq(stepnum-1), this.target).addClass('error')
        }else{
            $(this.steps.eq(stepnum-1), this.target).removeClass("error");
        }
    }

    SmartWizard.prototype.fixHeight = function(){
        var height = 0;

        var selStep = this.steps.eq(this.curStepIdx);
        var stepContainer = _step(this, selStep);
        stepContainer.children().each(function() {
            if($(this).is(':visible')) {
                 height += $(this).outerHeight(true);
            }
        });

        // These values (5 and 20) are experimentally chosen.
        stepContainer.height(height + 5);
        this.elmStepContainer.height(height + 20);
    }

    _init(this);
};



(function($){

    $.fn.smartWizard = function(method) {
        var args = arguments;
        var rv = undefined;
        var allObjs = this.each(function() {
            var wiz = $(this).data('smartWizard');
            if (typeof method == 'object' || ! method || ! wiz) {
                var options = $.extend({}, $.fn.smartWizard.defaults, method || {});
                if (! wiz) {
                    wiz = new SmartWizard($(this), options);
                    $(this).data('smartWizard', wiz);
                }
            } else {
                if (typeof SmartWizard.prototype[method] == "function") {
                    rv = SmartWizard.prototype[method].apply(wiz, Array.prototype.slice.call(args, 1));
                    return rv;
                } else {
                    $.error('Method ' + method + ' does not exist on jQuery.smartWizard');
                }
            }
        });
        if (rv === undefined) {
            return allObjs;
        } else {
            return rv;
        }
    };
	
		// Warn user if browser is closing		
	window.onbeforeunload = function() {
          return "Closing this browser window will result in losing your current data for this session?"
      }

// Default Properties and Events
    $.fn.smartWizard.defaults = {
        selected: 0,  // Selected Step, 0 = first step
        enableAllSteps: false,
        transitionEffect: 'none', // Effect on navigation, none/fade/slide/slideleft
        contentURL:null, // content url, Enables Ajax content loading
        contentCache:true, // cache step contents, if false content is fetched always from ajax url
        cycleSteps: false, // cycle step navigation
        enableFinishButton: false, // make finish button enabled always
        hideButtonsOnDisabled: true, // when the previous/next/finish buttons are disabled, hide them instead?
        errorSteps:[],    // Array Steps with errors
        labelNext:'Next',
        labelPrevious:'Previous',
        labelFinish:'Results',
        noForwardJumping: true,
        ajaxType: "POST",
        onLeaveStep: null, // triggers when leaving a step
        onShowStep: null,  // triggers when showing a step
        onFinish: true,  // triggers when Finish button is clicked
        includeFinishButton : true   // Add the finish button
    };
	


})(jQuery);
