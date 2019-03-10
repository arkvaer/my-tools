/**
 * 批量删除百度云文件的JS
 */



/**
 * 检测当前删除进度
 */

function checkProgress() {
    let nowProgross = $('div.module-yun-tip').text();
    let loadingFlag = $('div.wPQwLCb').attr('style');
    let showCount = $('div.cEefyz.open-enable').length;

    console.log("当前删除进度:" + nowProgross);
    if (nowProgross.startsWith("正在删除")) {
        console.log("正在删除,请稍侯!");
        return false;
    } else if (nowProgross === "删除成功") {
        console.log("上次文件已删除完毕!");
        if (loadingFlag === "visibility: hidden;" && showCount === 0) {
            $('span.vAFAFF.ugcOHtb').click();
        } else if (loadingFlag === "visibility: hidden;" && showCount !== 0) {
            checkNowStatus();
        }
        return false;
    } else if (nowProgross.startsWith("文件删除失败")) {
        console.log("文件删除失败");
        return false;
    } else if (loadingFlag === "visibility: visible;") {
        console.log("正在加载....");
        return false;
    } else {
        console.log("准备删除....");
        checkNowStatus();
    }
}

function checkNowStatus() {
    let flag = 0;
    let lostFile = $($('span.g-button-right')[31]);
    if (lostFile !== undefined && lostFile.text() === "我知道了") {
        console.log("遇到找不到的文件了!");
        $(lostFile).click();
        flag++;
    }
    let confimDel = $($('span.g-button-right')[30]).text();
    if (confimDel === "确定") {
        console.log("确认删除!");
        $($('span.g-button-right')[30]).click();

        flag++;
    }
    console.log("当前flag值" + flag);
    if (flag === 0) {
        mainDelete();
    }
}

/**
 * 检测当前选中文件个数
 */
function checkSelectLength() {
    console.log("检测当前选中文件个数");
    let showCount = $('div.cEefyz.open-enable').length;
    if (showCount === 0) {
        $('span.vAFAFF.ugcOHtb').click();
        console.log("当前显示文件个数" + showCount);
    }
    let checkCount = $('div.cEefyz.open-enable.wf4n1E').length;
    if (checkCount < 100) {
        $($('span.zbyDdwb')[0]).click();
        console.log("当前选中文件不足100个,重新选择文件!");
    } else {
        console.log("当前选中文件:" + checkCount + "个");
    }
}


function mainDelete() {
    checkSelectLength();
    setTimeout(function () {
        console.log("点击删除按钮!");
        $($('span.g-button-right')[15]).click();

        setTimeout(function () {
            console.log("点击确认按钮!");
            $($('span.g-button-right')[29]).click();
            console.log("开始删除!");
        }, 100);
    }, 100);
}

function startDelete() {
    setInterval(function () {
        checkProgress();
    }, 1000);
}