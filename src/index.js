var contextSwitcher
var contextSwitcherLock = false
var timer
var currentLanguage = "Chinese"

function contextSwitcherHandlerStopper() {
	if (!contextSwitcherLock) {
		let children = contextSwitcher.children()
		for (let i = 0; i < children.length; i++) {
			obj = children.eq(i)
			if (obj.offset().top - obj.parent().offset().top >= -10 && obj.offset().top - obj.parent().offset().top <= 10) {
				return
			}
		}
		clearTimeout(timer)
		timer = setTimeout(async () => {
			let children = contextSwitcher.children()
			for (let i = 0; i < children.length; i++) {
				if (children.eq(i).offset().top - contextSwitcher.offset().top >= 10) {
					contextSwitcherLock = true
					await scrollTo(children.eq(i))
					let children1 = contextSwitcher.children()
					for (let i = 0; i < children1.length; i++) {
						obj = children1.eq(i)
					}
					contextSwitcherLock = false
					break
				}
			}
			let min = 10000
			var minObj
			for (let i = 0; i < children.length; i++) {
				if (Math.abs(children.eq(i).offset().top - contextSwitcher.offset().top) < min) {
					minObj = i
					min = Math.abs(children.eq(i).offset().top - contextSwitcher.offset().top)
				}
			}
			if (minObj == 0 || minObj == 1) {
				if (currentLanguage != "Chinese") {
					currentLanguage = "Chinese"
					changeLanguage("Chinese")
				}
			}
			else if (minObj == 2 || minObj == 4) {
				if (currentLanguage != "English") {
					currentLanguage = "English"
					changeLanguage("English")
				}
			}
			else if (minObj == 3) {
				if (currentLanguage != "Japanese") {
					currentLanguage = "Japanese"
					changeLanguage("Japanese")
				}
			}
		}, 250)
	}
}

async function scrollTo(obj) {
	await obj.parent().animate({
		scrollTop: obj.offset().top - obj.parent().children().eq(0).offset().top
	}, 300);
}

$(document).ready(() => {
	contextSwitcher = $("#contextSwitcher")
	$("#contextSwitcher").on("scroll", contextSwitcherHandlerStopper)
	//scrollTo(contextSwitcher.children().eq(2))
})

function changeLanguage(language) {
	var func
	if (language == "English") {
		func = () => {
			$("#selfIntroduction1").text("Hi!")
			$("#selfIntroduction2-1").text("My name is ")
			$("#selfIntroduction2-2").text(". ")
			$("#selfIntroduction3").text("Nice to meet you!")
		}
	}
	else if (language == "Chinese") {
		func = () => {
			$("#selfIntroduction1").text("哈囉！")
			$("#selfIntroduction2-1").text("我叫做")
			$("#selfIntroduction2-2").text("。")
			$("#selfIntroduction3").text("很高興認識你！")
		}
	}
	else if (language == "Japanese") {
		func = () => {
			$("#selfIntroduction1").text("はじめまして！")
			$("#selfIntroduction2-1").text("わたしは")
			$("#selfIntroduction2-2").text("です。")
			$("#selfIntroduction3").text("よろしくお願いします！") // どうぞ
		}
	}
	removeClassFromSelfIntroduction("animation-fade-in")
	addClassToSelfIntroduction("animation-fade-out")
	setTimeout(() => {
		func()
		removeClassFromSelfIntroduction("animation-fade-out")
		addClassToSelfIntroduction("animation-fade-in")
	}, 300)
}

function addClassToSelfIntroduction(className) {
	$("#selfIntroduction1").addClass(className)
	$("#selfIntroduction2-1").addClass(className)
	$("#selfIntroduction2-2").addClass(className)
	$("#selfIntroduction3").addClass(className)
}

function removeClassFromSelfIntroduction(className) {
	$("#selfIntroduction1").removeClass(className)
	$("#selfIntroduction2-1").removeClass(className)
	$("#selfIntroduction2-2").removeClass(className)
	$("#selfIntroduction3").removeClass(className)
}
