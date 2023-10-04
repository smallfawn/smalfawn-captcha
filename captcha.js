/**
 * 挑战从0开始写一个验证码组件 滑块 数字 等
 * @author https://github.com/smallfawn
 * @time 2023/10/04
 * @version 000
 */

/**
 * 初始化
 */
function initCaptcha(captchaConfig, onError) {
    window.onload = async function () {
        let captchaElement = captchaConfig.captchaElement;
        let captchaKey = captchaConfig.captchaKey;
        let onVerify = captchaConfig.onVerify;



        function onSuccess(data) {
            if (onVerify) {
                onVerify(null, data);
            }
        }
        function onFailure(err) {
            if (onVerify) {
                onVerify(err);
            }
        }
        /*onSuccess({
            validate: 'xxxxx' // 二次验证信息
        })*/ //成功
        let keyStatus = await captchaCore().checkCaptchaKey(captchaKey)
        if (keyStatus) {
            let captchaElementDom = document.getElementById(captchaElement);
            if (captchaCore().checkElement(captchaElementDom)) {
                if (captchaCore().checkEnv()) {
                    console.log(`创建滑块`);
                    captchaCore().creatSlider(captchaElementDom)
                } else {
                    onError(`创建验证码失败`)
                }
            } else {
                onError(`创建验证码失败`)
            }
        } else {
            onError(`创建验证码失败`)
        }




    }

}


function captchaCore() {

    return new class captchaInit {
        constructor() {
            this.captchaKey = "";
        }
        encrypt(data) {
            //前50位轨迹
            //输入的内容
            //判断data是否为数组
            if (Array.isArray(data)) {

            }
            if (typeof data === 'string') {
                
            }
        }
        getKeyDown() {
            document.addEventListener('keydown', (event) => {
                const key = event.key;
                // 在这里可以根据不同的按键执行相应的操作
            });
        }
        checkCaptchaKey(captchaKey) {
            return new Promise((resolve, reject) => {
                if (captchaKey == "" || captchaKey == null || captchaKey == undefined) {
                    resolve(false);
                } else {
                    try {
                        fetch(`http://captcha.xxx.xxx/check/key?key=${captchaKey}`).then((response) => {
                            console.log(response);
                            response.json();
                            if (response) {
                                if (response.status == 'success') {
                                    resolve(true);
                                } else {
                                    resolve(false);
                                }
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }

                }
            })
        }
        checkCaptcha() {

        }
        getMouseMove() {

        }
        checkEnv() {
            if (typeof window !== 'undefined') {
                return true;
            } else {
                return false;
            }
        }
        checkElement(elementDom) {
            if (elementDom !== null) {
                return true
            } else {
                return false
            }
        }
        creatSlider(captchaElementDom) {
            // 创建滑块元素
            const slider = document.createElement('div');
            slider.id = 'slider';
            // 将滑块元素添加到容器中
            captchaElementDom.appendChild(slider);
            // 添加滑块事件处理
            let isDragging = false;
            let startX = 0;

            slider.addEventListener('mousedown', (event) => {
                isDragging = true;
                startX = event.clientX;
            });

            document.addEventListener('mousemove', (event) => {
                if (isDragging) {
                    const offsetX = event.clientX - startX;
                    slider.style.left = offsetX + 'px';
                }
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
                startX = 0;
            });

        }
    }

}


//disableDebugger()
function disableDebugger() {
    // 方法1：使用 debugger 语句停止调试器
    debugger;

    // 方法2：重写 console.log 并触发调试器
    var originalLog = console.log;
    console.log = function () {
        debugger;
        originalLog.apply(console, arguments);
    };

    // 方法3：使用 try...catch 捕获调试器异常
    try {
        console.log();
    } catch (e) {
        debugger;
    }
}








