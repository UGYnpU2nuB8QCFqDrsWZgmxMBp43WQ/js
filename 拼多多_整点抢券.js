function getTimestamps() {
    // 创建当前日期对象
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 注意：月份从0开始（0表示1月，11表示12月）
    const day = currentDate.getDate();

    // 定义时间点数组
    const times = [
        "00:00", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:15", "20:30", "20:45", "21:00"
    ];

    // 用于存储时间戳的数组
    const timestamps = [];

    // 计算每个时间点的时间戳
    times.forEach(time => {
        const [hours, minutes] = time.split(":");
        const date = new Date(year, month, day, parseInt(hours), parseInt(minutes));
        timestamps.push(date.getTime());
    });

    return timestamps;
}

function getFutureTimestamps() {
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();

    // 获取所有时间点的时间戳
    const timestamps = getTimestamps();

    // 过滤出尚未到达的时间戳
    const futureTimestamps = timestamps.filter(timestamp => timestamp > currentTimestamp);

    return futureTimestamps;
}

function get_gap(start_time) {
    return start_time - new Date().getTime()
}

function main() {
    //一直保持屏幕常亮
    device.keepScreenDim()
    
    const futureTimestamps = getFutureTimestamps()
    for (let i = 0; i < getFutureTimestamps().length; i++) {
        get_gap(futureTimestamps[i])

        while (get_gap(futureTimestamps[i]) > 60000) {}

        launch("com.xunmeng.pinduoduo")
        sleep(2000)
        swipe(600, 350, 400, 900, 300)

        while (get_gap(futureTimestamps[i]) > 2000) {}

        swipe(600, 350, 400, 900, 350)
        text().findOne(2000).click("立即抢")
    }
}

main()