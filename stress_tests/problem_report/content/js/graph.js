/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 2194.0, "minX": 0.0, "maxY": 6607.0, "series": [{"data": [[0.0, 2194.0], [0.1, 2194.0], [0.2, 2194.0], [0.3, 2194.0], [0.4, 2231.0], [0.5, 2231.0], [0.6, 2231.0], [0.7, 2241.0], [0.8, 2241.0], [0.9, 2241.0], [1.0, 2253.0], [1.1, 2253.0], [1.2, 2253.0], [1.3, 2253.0], [1.4, 2293.0], [1.5, 2293.0], [1.6, 2293.0], [1.7, 2335.0], [1.8, 2335.0], [1.9, 2335.0], [2.0, 2357.0], [2.1, 2357.0], [2.2, 2357.0], [2.3, 2357.0], [2.4, 2380.0], [2.5, 2380.0], [2.6, 2380.0], [2.7, 2384.0], [2.8, 2384.0], [2.9, 2384.0], [3.0, 2385.0], [3.1, 2385.0], [3.2, 2385.0], [3.3, 2385.0], [3.4, 2388.0], [3.5, 2388.0], [3.6, 2388.0], [3.7, 2396.0], [3.8, 2396.0], [3.9, 2396.0], [4.0, 2402.0], [4.1, 2402.0], [4.2, 2402.0], [4.3, 2402.0], [4.4, 2412.0], [4.5, 2412.0], [4.6, 2412.0], [4.7, 2424.0], [4.8, 2424.0], [4.9, 2424.0], [5.0, 2428.0], [5.1, 2428.0], [5.2, 2428.0], [5.3, 2428.0], [5.4, 2430.0], [5.5, 2430.0], [5.6, 2430.0], [5.7, 2433.0], [5.8, 2433.0], [5.9, 2433.0], [6.0, 2447.0], [6.1, 2447.0], [6.2, 2447.0], [6.3, 2447.0], [6.4, 2451.0], [6.5, 2451.0], [6.6, 2451.0], [6.7, 2456.0], [6.8, 2456.0], [6.9, 2456.0], [7.0, 2463.0], [7.1, 2463.0], [7.2, 2463.0], [7.3, 2463.0], [7.4, 2478.0], [7.5, 2478.0], [7.6, 2478.0], [7.7, 2494.0], [7.8, 2494.0], [7.9, 2494.0], [8.0, 2500.0], [8.1, 2500.0], [8.2, 2500.0], [8.3, 2500.0], [8.4, 2510.0], [8.5, 2510.0], [8.6, 2510.0], [8.7, 2518.0], [8.8, 2518.0], [8.9, 2518.0], [9.0, 2518.0], [9.1, 2518.0], [9.2, 2518.0], [9.3, 2518.0], [9.4, 2526.0], [9.5, 2526.0], [9.6, 2526.0], [9.7, 2564.0], [9.8, 2564.0], [9.9, 2564.0], [10.0, 2573.0], [10.1, 2573.0], [10.2, 2573.0], [10.3, 2573.0], [10.4, 2578.0], [10.5, 2578.0], [10.6, 2578.0], [10.7, 2582.0], [10.8, 2582.0], [10.9, 2582.0], [11.0, 2584.0], [11.1, 2584.0], [11.2, 2584.0], [11.3, 2584.0], [11.4, 2586.0], [11.5, 2586.0], [11.6, 2586.0], [11.7, 2587.0], [11.8, 2587.0], [11.9, 2587.0], [12.0, 2587.0], [12.1, 2603.0], [12.2, 2603.0], [12.3, 2603.0], [12.4, 2604.0], [12.5, 2604.0], [12.6, 2604.0], [12.7, 2618.0], [12.8, 2618.0], [12.9, 2618.0], [13.0, 2618.0], [13.1, 2619.0], [13.2, 2619.0], [13.3, 2619.0], [13.4, 2631.0], [13.5, 2631.0], [13.6, 2631.0], [13.7, 2652.0], [13.8, 2652.0], [13.9, 2652.0], [14.0, 2652.0], [14.1, 2655.0], [14.2, 2655.0], [14.3, 2655.0], [14.4, 2660.0], [14.5, 2660.0], [14.6, 2660.0], [14.7, 2708.0], [14.8, 2708.0], [14.9, 2708.0], [15.0, 2708.0], [15.1, 2724.0], [15.2, 2724.0], [15.3, 2724.0], [15.4, 2726.0], [15.5, 2726.0], [15.6, 2726.0], [15.7, 2729.0], [15.8, 2729.0], [15.9, 2729.0], [16.0, 2729.0], [16.1, 2742.0], [16.2, 2742.0], [16.3, 2742.0], [16.4, 2744.0], [16.5, 2744.0], [16.6, 2744.0], [16.7, 2756.0], [16.8, 2756.0], [16.9, 2756.0], [17.0, 2756.0], [17.1, 2764.0], [17.2, 2764.0], [17.3, 2764.0], [17.4, 2770.0], [17.5, 2770.0], [17.6, 2770.0], [17.7, 2792.0], [17.8, 2792.0], [17.9, 2792.0], [18.0, 2798.0], [18.1, 2798.0], [18.2, 2798.0], [18.3, 2798.0], [18.4, 2805.0], [18.5, 2805.0], [18.6, 2805.0], [18.7, 2813.0], [18.8, 2813.0], [18.9, 2813.0], [19.0, 2822.0], [19.1, 2822.0], [19.2, 2822.0], [19.3, 2822.0], [19.4, 2853.0], [19.5, 2853.0], [19.6, 2853.0], [19.7, 2861.0], [19.8, 2861.0], [19.9, 2861.0], [20.0, 2869.0], [20.1, 2869.0], [20.2, 2869.0], [20.3, 2869.0], [20.4, 2875.0], [20.5, 2875.0], [20.6, 2875.0], [20.7, 2892.0], [20.8, 2892.0], [20.9, 2892.0], [21.0, 2902.0], [21.1, 2902.0], [21.2, 2902.0], [21.3, 2902.0], [21.4, 2918.0], [21.5, 2918.0], [21.6, 2918.0], [21.7, 2923.0], [21.8, 2923.0], [21.9, 2923.0], [22.0, 2924.0], [22.1, 2924.0], [22.2, 2924.0], [22.3, 2924.0], [22.4, 2926.0], [22.5, 2926.0], [22.6, 2926.0], [22.7, 2931.0], [22.8, 2931.0], [22.9, 2931.0], [23.0, 2948.0], [23.1, 2948.0], [23.2, 2948.0], [23.3, 2948.0], [23.4, 2954.0], [23.5, 2954.0], [23.6, 2954.0], [23.7, 2968.0], [23.8, 2968.0], [23.9, 2968.0], [24.0, 2970.0], [24.1, 2970.0], [24.2, 2970.0], [24.3, 2970.0], [24.4, 2980.0], [24.5, 2980.0], [24.6, 2980.0], [24.7, 2984.0], [24.8, 2984.0], [24.9, 2984.0], [25.0, 2987.0], [25.1, 2987.0], [25.2, 2987.0], [25.3, 2987.0], [25.4, 3010.0], [25.5, 3010.0], [25.6, 3010.0], [25.7, 3012.0], [25.8, 3012.0], [25.9, 3012.0], [26.0, 3019.0], [26.1, 3019.0], [26.2, 3019.0], [26.3, 3019.0], [26.4, 3020.0], [26.5, 3020.0], [26.6, 3020.0], [26.7, 3056.0], [26.8, 3056.0], [26.9, 3056.0], [27.0, 3071.0], [27.1, 3071.0], [27.2, 3071.0], [27.3, 3071.0], [27.4, 3081.0], [27.5, 3081.0], [27.6, 3081.0], [27.7, 3097.0], [27.8, 3097.0], [27.9, 3097.0], [28.0, 3098.0], [28.1, 3098.0], [28.2, 3098.0], [28.3, 3098.0], [28.4, 3139.0], [28.5, 3139.0], [28.6, 3139.0], [28.7, 3141.0], [28.8, 3141.0], [28.9, 3141.0], [29.0, 3142.0], [29.1, 3142.0], [29.2, 3142.0], [29.3, 3142.0], [29.4, 3155.0], [29.5, 3155.0], [29.6, 3155.0], [29.7, 3156.0], [29.8, 3156.0], [29.9, 3156.0], [30.0, 3194.0], [30.1, 3194.0], [30.2, 3194.0], [30.3, 3194.0], [30.4, 3204.0], [30.5, 3204.0], [30.6, 3204.0], [30.7, 3204.0], [30.8, 3204.0], [30.9, 3204.0], [31.0, 3210.0], [31.1, 3210.0], [31.2, 3210.0], [31.3, 3210.0], [31.4, 3212.0], [31.5, 3212.0], [31.6, 3212.0], [31.7, 3222.0], [31.8, 3222.0], [31.9, 3222.0], [32.0, 3230.0], [32.1, 3230.0], [32.2, 3230.0], [32.3, 3230.0], [32.4, 3234.0], [32.5, 3234.0], [32.6, 3234.0], [32.7, 3287.0], [32.8, 3287.0], [32.9, 3287.0], [33.0, 3288.0], [33.1, 3288.0], [33.2, 3288.0], [33.3, 3288.0], [33.4, 3288.0], [33.5, 3288.0], [33.6, 3288.0], [33.7, 3288.0], [33.8, 3288.0], [33.9, 3288.0], [34.0, 3291.0], [34.1, 3291.0], [34.2, 3291.0], [34.3, 3291.0], [34.4, 3327.0], [34.5, 3327.0], [34.6, 3327.0], [34.7, 3339.0], [34.8, 3339.0], [34.9, 3339.0], [35.0, 3346.0], [35.1, 3346.0], [35.2, 3346.0], [35.3, 3346.0], [35.4, 3347.0], [35.5, 3347.0], [35.6, 3347.0], [35.7, 3350.0], [35.8, 3350.0], [35.9, 3350.0], [36.0, 3352.0], [36.1, 3352.0], [36.2, 3352.0], [36.3, 3352.0], [36.4, 3354.0], [36.5, 3354.0], [36.6, 3354.0], [36.7, 3379.0], [36.8, 3379.0], [36.9, 3379.0], [37.0, 3382.0], [37.1, 3382.0], [37.2, 3382.0], [37.3, 3382.0], [37.4, 3389.0], [37.5, 3389.0], [37.6, 3389.0], [37.7, 3392.0], [37.8, 3392.0], [37.9, 3392.0], [38.0, 3476.0], [38.1, 3476.0], [38.2, 3476.0], [38.3, 3476.0], [38.4, 3516.0], [38.5, 3516.0], [38.6, 3516.0], [38.7, 3541.0], [38.8, 3541.0], [38.9, 3541.0], [39.0, 3546.0], [39.1, 3546.0], [39.2, 3546.0], [39.3, 3546.0], [39.4, 3559.0], [39.5, 3559.0], [39.6, 3559.0], [39.7, 3564.0], [39.8, 3564.0], [39.9, 3564.0], [40.0, 3589.0], [40.1, 3589.0], [40.2, 3589.0], [40.3, 3589.0], [40.4, 3607.0], [40.5, 3607.0], [40.6, 3607.0], [40.7, 3632.0], [40.8, 3632.0], [40.9, 3632.0], [41.0, 3632.0], [41.1, 3639.0], [41.2, 3639.0], [41.3, 3639.0], [41.4, 3649.0], [41.5, 3649.0], [41.6, 3649.0], [41.7, 3668.0], [41.8, 3668.0], [41.9, 3668.0], [42.0, 3668.0], [42.1, 3704.0], [42.2, 3704.0], [42.3, 3704.0], [42.4, 3718.0], [42.5, 3718.0], [42.6, 3718.0], [42.7, 3734.0], [42.8, 3734.0], [42.9, 3734.0], [43.0, 3734.0], [43.1, 3741.0], [43.2, 3741.0], [43.3, 3741.0], [43.4, 3769.0], [43.5, 3769.0], [43.6, 3769.0], [43.7, 3786.0], [43.8, 3786.0], [43.9, 3786.0], [44.0, 3786.0], [44.1, 3786.0], [44.2, 3786.0], [44.3, 3786.0], [44.4, 3801.0], [44.5, 3801.0], [44.6, 3801.0], [44.7, 3833.0], [44.8, 3833.0], [44.9, 3833.0], [45.0, 3833.0], [45.1, 3854.0], [45.2, 3854.0], [45.3, 3854.0], [45.4, 3867.0], [45.5, 3867.0], [45.6, 3867.0], [45.7, 3887.0], [45.8, 3887.0], [45.9, 3887.0], [46.0, 3887.0], [46.1, 3891.0], [46.2, 3891.0], [46.3, 3891.0], [46.4, 3892.0], [46.5, 3892.0], [46.6, 3892.0], [46.7, 3899.0], [46.8, 3899.0], [46.9, 3899.0], [47.0, 3899.0], [47.1, 3907.0], [47.2, 3907.0], [47.3, 3907.0], [47.4, 3930.0], [47.5, 3930.0], [47.6, 3930.0], [47.7, 3958.0], [47.8, 3958.0], [47.9, 3958.0], [48.0, 3958.0], [48.1, 3967.0], [48.2, 3967.0], [48.3, 3967.0], [48.4, 4051.0], [48.5, 4051.0], [48.6, 4051.0], [48.7, 4055.0], [48.8, 4055.0], [48.9, 4055.0], [49.0, 4055.0], [49.1, 4113.0], [49.2, 4113.0], [49.3, 4113.0], [49.4, 4123.0], [49.5, 4123.0], [49.6, 4123.0], [49.7, 4135.0], [49.8, 4135.0], [49.9, 4135.0], [50.0, 4135.0], [50.1, 4186.0], [50.2, 4186.0], [50.3, 4186.0], [50.4, 4190.0], [50.5, 4190.0], [50.6, 4190.0], [50.7, 4191.0], [50.8, 4191.0], [50.9, 4191.0], [51.0, 4191.0], [51.1, 4193.0], [51.2, 4193.0], [51.3, 4193.0], [51.4, 4207.0], [51.5, 4207.0], [51.6, 4207.0], [51.7, 4209.0], [51.8, 4209.0], [51.9, 4209.0], [52.0, 4209.0], [52.1, 4214.0], [52.2, 4214.0], [52.3, 4214.0], [52.4, 4233.0], [52.5, 4233.0], [52.6, 4233.0], [52.7, 4236.0], [52.8, 4236.0], [52.9, 4236.0], [53.0, 4236.0], [53.1, 4248.0], [53.2, 4248.0], [53.3, 4248.0], [53.4, 4256.0], [53.5, 4256.0], [53.6, 4256.0], [53.7, 4260.0], [53.8, 4260.0], [53.9, 4260.0], [54.0, 4260.0], [54.1, 4261.0], [54.2, 4261.0], [54.3, 4261.0], [54.4, 4261.0], [54.5, 4261.0], [54.6, 4261.0], [54.7, 4266.0], [54.8, 4266.0], [54.9, 4266.0], [55.0, 4266.0], [55.1, 4269.0], [55.2, 4269.0], [55.3, 4269.0], [55.4, 4272.0], [55.5, 4272.0], [55.6, 4272.0], [55.7, 4273.0], [55.8, 4273.0], [55.9, 4273.0], [56.0, 4273.0], [56.1, 4299.0], [56.2, 4299.0], [56.3, 4299.0], [56.4, 4303.0], [56.5, 4303.0], [56.6, 4303.0], [56.7, 4304.0], [56.8, 4304.0], [56.9, 4304.0], [57.0, 4304.0], [57.1, 4310.0], [57.2, 4310.0], [57.3, 4310.0], [57.4, 4320.0], [57.5, 4320.0], [57.6, 4320.0], [57.7, 4323.0], [57.8, 4323.0], [57.9, 4323.0], [58.0, 4323.0], [58.1, 4337.0], [58.2, 4337.0], [58.3, 4337.0], [58.4, 4340.0], [58.5, 4340.0], [58.6, 4340.0], [58.7, 4346.0], [58.8, 4346.0], [58.9, 4346.0], [59.0, 4346.0], [59.1, 4349.0], [59.2, 4349.0], [59.3, 4349.0], [59.4, 4351.0], [59.5, 4351.0], [59.6, 4351.0], [59.7, 4361.0], [59.8, 4361.0], [59.9, 4361.0], [60.0, 4361.0], [60.1, 4363.0], [60.2, 4363.0], [60.3, 4363.0], [60.4, 4364.0], [60.5, 4364.0], [60.6, 4364.0], [60.7, 4364.0], [60.8, 4364.0], [60.9, 4364.0], [61.0, 4364.0], [61.1, 4365.0], [61.2, 4365.0], [61.3, 4365.0], [61.4, 4368.0], [61.5, 4368.0], [61.6, 4368.0], [61.7, 4368.0], [61.8, 4368.0], [61.9, 4368.0], [62.0, 4368.0], [62.1, 4369.0], [62.2, 4369.0], [62.3, 4369.0], [62.4, 4382.0], [62.5, 4382.0], [62.6, 4382.0], [62.7, 4384.0], [62.8, 4384.0], [62.9, 4384.0], [63.0, 4384.0], [63.1, 4384.0], [63.2, 4384.0], [63.3, 4384.0], [63.4, 4385.0], [63.5, 4385.0], [63.6, 4385.0], [63.7, 4385.0], [63.8, 4385.0], [63.9, 4385.0], [64.0, 4385.0], [64.1, 4386.0], [64.2, 4386.0], [64.3, 4386.0], [64.4, 4392.0], [64.5, 4392.0], [64.6, 4392.0], [64.7, 4398.0], [64.8, 4398.0], [64.9, 4398.0], [65.0, 4398.0], [65.1, 4411.0], [65.2, 4411.0], [65.3, 4411.0], [65.4, 4432.0], [65.5, 4432.0], [65.6, 4432.0], [65.7, 4435.0], [65.8, 4435.0], [65.9, 4435.0], [66.0, 4435.0], [66.1, 4437.0], [66.2, 4437.0], [66.3, 4437.0], [66.4, 4440.0], [66.5, 4440.0], [66.6, 4440.0], [66.7, 4450.0], [66.8, 4450.0], [66.9, 4450.0], [67.0, 4450.0], [67.1, 4451.0], [67.2, 4451.0], [67.3, 4451.0], [67.4, 4454.0], [67.5, 4454.0], [67.6, 4454.0], [67.7, 4455.0], [67.8, 4455.0], [67.9, 4455.0], [68.0, 4455.0], [68.1, 4459.0], [68.2, 4459.0], [68.3, 4459.0], [68.4, 4483.0], [68.5, 4483.0], [68.6, 4483.0], [68.7, 4487.0], [68.8, 4487.0], [68.9, 4487.0], [69.0, 4487.0], [69.1, 4492.0], [69.2, 4492.0], [69.3, 4492.0], [69.4, 4510.0], [69.5, 4510.0], [69.6, 4510.0], [69.7, 4513.0], [69.8, 4513.0], [69.9, 4513.0], [70.0, 4513.0], [70.1, 4513.0], [70.2, 4513.0], [70.3, 4513.0], [70.4, 4519.0], [70.5, 4519.0], [70.6, 4519.0], [70.7, 4519.0], [70.8, 4519.0], [70.9, 4519.0], [71.0, 4519.0], [71.1, 4521.0], [71.2, 4521.0], [71.3, 4521.0], [71.4, 4527.0], [71.5, 4527.0], [71.6, 4527.0], [71.7, 4535.0], [71.8, 4535.0], [71.9, 4535.0], [72.0, 4535.0], [72.1, 4540.0], [72.2, 4540.0], [72.3, 4540.0], [72.4, 4542.0], [72.5, 4542.0], [72.6, 4542.0], [72.7, 4543.0], [72.8, 4543.0], [72.9, 4543.0], [73.0, 4543.0], [73.1, 4548.0], [73.2, 4548.0], [73.3, 4548.0], [73.4, 4561.0], [73.5, 4561.0], [73.6, 4561.0], [73.7, 4561.0], [73.8, 4561.0], [73.9, 4561.0], [74.0, 4561.0], [74.1, 4566.0], [74.2, 4566.0], [74.3, 4566.0], [74.4, 4580.0], [74.5, 4580.0], [74.6, 4580.0], [74.7, 4580.0], [74.8, 4580.0], [74.9, 4580.0], [75.0, 4580.0], [75.1, 4584.0], [75.2, 4584.0], [75.3, 4584.0], [75.4, 4587.0], [75.5, 4587.0], [75.6, 4587.0], [75.7, 4588.0], [75.8, 4588.0], [75.9, 4588.0], [76.0, 4588.0], [76.1, 4591.0], [76.2, 4591.0], [76.3, 4591.0], [76.4, 4597.0], [76.5, 4597.0], [76.6, 4597.0], [76.7, 4600.0], [76.8, 4600.0], [76.9, 4600.0], [77.0, 4606.0], [77.1, 4606.0], [77.2, 4606.0], [77.3, 4606.0], [77.4, 4615.0], [77.5, 4615.0], [77.6, 4615.0], [77.7, 4615.0], [77.8, 4615.0], [77.9, 4615.0], [78.0, 4621.0], [78.1, 4621.0], [78.2, 4621.0], [78.3, 4621.0], [78.4, 4631.0], [78.5, 4631.0], [78.6, 4631.0], [78.7, 4642.0], [78.8, 4642.0], [78.9, 4642.0], [79.0, 4650.0], [79.1, 4650.0], [79.2, 4650.0], [79.3, 4650.0], [79.4, 4650.0], [79.5, 4650.0], [79.6, 4650.0], [79.7, 4652.0], [79.8, 4652.0], [79.9, 4652.0], [80.0, 4654.0], [80.1, 4654.0], [80.2, 4654.0], [80.3, 4654.0], [80.4, 4656.0], [80.5, 4656.0], [80.6, 4656.0], [80.7, 4659.0], [80.8, 4659.0], [80.9, 4659.0], [81.0, 4664.0], [81.1, 4664.0], [81.2, 4664.0], [81.3, 4664.0], [81.4, 4675.0], [81.5, 4675.0], [81.6, 4675.0], [81.7, 4676.0], [81.8, 4676.0], [81.9, 4676.0], [82.0, 4682.0], [82.1, 4682.0], [82.2, 4682.0], [82.3, 4682.0], [82.4, 4688.0], [82.5, 4688.0], [82.6, 4688.0], [82.7, 4690.0], [82.8, 4690.0], [82.9, 4690.0], [83.0, 4694.0], [83.1, 4694.0], [83.2, 4694.0], [83.3, 4694.0], [83.4, 4696.0], [83.5, 4696.0], [83.6, 4696.0], [83.7, 4704.0], [83.8, 4704.0], [83.9, 4704.0], [84.0, 4715.0], [84.1, 4715.0], [84.2, 4715.0], [84.3, 4715.0], [84.4, 4717.0], [84.5, 4717.0], [84.6, 4717.0], [84.7, 4720.0], [84.8, 4720.0], [84.9, 4720.0], [85.0, 4721.0], [85.1, 4721.0], [85.2, 4721.0], [85.3, 4721.0], [85.4, 4723.0], [85.5, 4723.0], [85.6, 4723.0], [85.7, 4726.0], [85.8, 4726.0], [85.9, 4726.0], [86.0, 4735.0], [86.1, 4735.0], [86.2, 4735.0], [86.3, 4735.0], [86.4, 4742.0], [86.5, 4742.0], [86.6, 4742.0], [86.7, 4750.0], [86.8, 4750.0], [86.9, 4750.0], [87.0, 4780.0], [87.1, 4780.0], [87.2, 4780.0], [87.3, 4780.0], [87.4, 4782.0], [87.5, 4782.0], [87.6, 4782.0], [87.7, 4784.0], [87.8, 4784.0], [87.9, 4784.0], [88.0, 4797.0], [88.1, 4797.0], [88.2, 4797.0], [88.3, 4797.0], [88.4, 4810.0], [88.5, 4810.0], [88.6, 4810.0], [88.7, 4821.0], [88.8, 4821.0], [88.9, 4821.0], [89.0, 4837.0], [89.1, 4837.0], [89.2, 4837.0], [89.3, 4837.0], [89.4, 4844.0], [89.5, 4844.0], [89.6, 4844.0], [89.7, 4846.0], [89.8, 4846.0], [89.9, 4846.0], [90.0, 4866.0], [90.1, 4866.0], [90.2, 4866.0], [90.3, 4866.0], [90.4, 4879.0], [90.5, 4879.0], [90.6, 4879.0], [90.7, 4882.0], [90.8, 4882.0], [90.9, 4882.0], [91.0, 4895.0], [91.1, 4895.0], [91.2, 4895.0], [91.3, 4895.0], [91.4, 4899.0], [91.5, 4899.0], [91.6, 4899.0], [91.7, 4911.0], [91.8, 4911.0], [91.9, 4911.0], [92.0, 4914.0], [92.1, 4914.0], [92.2, 4914.0], [92.3, 4914.0], [92.4, 4940.0], [92.5, 4940.0], [92.6, 4940.0], [92.7, 4942.0], [92.8, 4942.0], [92.9, 4942.0], [93.0, 4969.0], [93.1, 4969.0], [93.2, 4969.0], [93.3, 4969.0], [93.4, 4979.0], [93.5, 4979.0], [93.6, 4979.0], [93.7, 5034.0], [93.8, 5034.0], [93.9, 5034.0], [94.0, 5035.0], [94.1, 5035.0], [94.2, 5035.0], [94.3, 5035.0], [94.4, 5107.0], [94.5, 5107.0], [94.6, 5107.0], [94.7, 5140.0], [94.8, 5140.0], [94.9, 5140.0], [95.0, 5146.0], [95.1, 5146.0], [95.2, 5146.0], [95.3, 5146.0], [95.4, 5162.0], [95.5, 5162.0], [95.6, 5162.0], [95.7, 5171.0], [95.8, 5171.0], [95.9, 5171.0], [96.0, 5196.0], [96.1, 5196.0], [96.2, 5196.0], [96.3, 5196.0], [96.4, 5242.0], [96.5, 5242.0], [96.6, 5242.0], [96.7, 5272.0], [96.8, 5272.0], [96.9, 5272.0], [97.0, 5457.0], [97.1, 5457.0], [97.2, 5457.0], [97.3, 5457.0], [97.4, 5564.0], [97.5, 5564.0], [97.6, 5564.0], [97.7, 5621.0], [97.8, 5621.0], [97.9, 5621.0], [98.0, 5762.0], [98.1, 5762.0], [98.2, 5762.0], [98.3, 5762.0], [98.4, 5890.0], [98.5, 5890.0], [98.6, 5890.0], [98.7, 5945.0], [98.8, 5945.0], [98.9, 5945.0], [99.0, 6010.0], [99.1, 6010.0], [99.2, 6010.0], [99.3, 6010.0], [99.4, 6253.0], [99.5, 6253.0], [99.6, 6253.0], [99.7, 6607.0], [99.8, 6607.0], [99.9, 6607.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 2100.0, "maxY": 26.0, "series": [{"data": [[2100.0, 1.0], [2200.0, 4.0], [2300.0, 7.0], [2400.0, 12.0], [2500.0, 12.0], [2600.0, 8.0], [2700.0, 11.0], [2800.0, 8.0], [2900.0, 13.0], [3000.0, 9.0], [3100.0, 6.0], [3300.0, 11.0], [3200.0, 12.0], [3400.0, 1.0], [3500.0, 6.0], [3700.0, 7.0], [3600.0, 5.0], [3800.0, 8.0], [3900.0, 4.0], [4000.0, 2.0], [4100.0, 7.0], [4300.0, 26.0], [4200.0, 15.0], [4500.0, 22.0], [4600.0, 21.0], [4400.0, 13.0], [4800.0, 10.0], [4700.0, 14.0], [4900.0, 6.0], [5100.0, 6.0], [5000.0, 2.0], [5200.0, 2.0], [5600.0, 1.0], [5500.0, 1.0], [5400.0, 1.0], [5800.0, 1.0], [5700.0, 1.0], [6000.0, 1.0], [5900.0, 1.0], [6200.0, 1.0], [6600.0, 1.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 6600.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 300.0, "minX": 2.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 300.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 300.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 53.74333333333332, "minX": 1.71787842E12, "maxY": 53.74333333333332, "series": [{"data": [[1.71787842E12, 53.74333333333332]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71787842E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 2385.0, "minX": 1.0, "maxY": 6010.0, "series": [{"data": [[2.0, 2430.0], [3.0, 2494.0], [4.0, 2412.0], [8.0, 2530.75], [9.0, 2463.0], [10.0, 2526.0], [11.0, 2587.0], [12.0, 2655.0], [13.0, 2724.0], [14.0, 2764.0], [15.0, 2853.0], [16.0, 2918.0], [17.0, 4123.0], [18.0, 3056.0], [19.0, 3019.0], [20.0, 2798.0], [21.0, 2861.0], [22.0, 2822.0], [23.0, 4561.0], [24.0, 4606.0], [25.0, 2813.0], [26.0, 2869.0], [27.0, 2931.0], [28.0, 3476.0], [29.0, 3546.0], [30.0, 3668.0], [31.0, 2924.0], [33.0, 3071.0], [32.0, 3155.0], [35.0, 3255.0], [37.0, 2815.0], [36.0, 2948.0], [39.0, 2783.857142857143], [38.0, 2561.6], [41.0, 2983.0], [40.0, 2739.6], [43.0, 2703.333333333333], [42.0, 2766.5], [45.0, 3503.3333333333335], [44.0, 2676.6666666666665], [47.0, 3497.5], [46.0, 3200.777777777778], [49.0, 3220.1250000000005], [48.0, 3202.3], [51.0, 3522.125], [50.0, 3575.25], [53.0, 3797.75], [52.0, 3556.75], [54.0, 3780.75], [55.0, 3752.75], [56.0, 3784.857142857143], [57.0, 3908.3333333333335], [59.0, 4305.5], [58.0, 4147.0], [61.0, 4844.0], [60.0, 4784.0], [63.0, 4579.5], [62.0, 4969.0], [67.0, 4593.0666666666675], [66.0, 4585.461538461538], [65.0, 4344.785714285715], [64.0, 4559.5], [71.0, 4688.857142857143], [70.0, 4648.733333333333], [69.0, 4564.583333333334], [68.0, 4485.0], [75.0, 4659.0], [74.0, 4656.75], [73.0, 4859.333333333333], [72.0, 4769.0], [79.0, 5043.0], [78.0, 5035.0], [77.0, 4979.0], [76.0, 4599.5], [82.0, 5416.0], [81.0, 5320.5], [80.0, 5294.25], [83.0, 5945.0], [86.0, 5196.0], [85.0, 5140.0], [84.0, 6010.0], [1.0, 2385.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[53.74333333333332, 3858.9000000000005]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 86.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 1160.0, "minX": 1.71787842E12, "maxY": 1755.0, "series": [{"data": [[1.71787842E12, 1755.0]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71787842E12, 1160.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71787842E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 3858.9000000000005, "minX": 1.71787842E12, "maxY": 3858.9000000000005, "series": [{"data": [[1.71787842E12, 3858.9000000000005]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71787842E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 3858.8500000000026, "minX": 1.71787842E12, "maxY": 3858.8500000000026, "series": [{"data": [[1.71787842E12, 3858.8500000000026]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71787842E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 2.7566666666666686, "minX": 1.71787842E12, "maxY": 2.7566666666666686, "series": [{"data": [[1.71787842E12, 2.7566666666666686]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71787842E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 2194.0, "minX": 1.71787842E12, "maxY": 6607.0, "series": [{"data": [[1.71787842E12, 6607.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71787842E12, 4864.000000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71787842E12, 6009.35]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71787842E12, 5145.7]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.71787842E12, 2194.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71787842E12, 4160.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71787842E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 2393.0, "minX": 3.0, "maxY": 4797.0, "series": [{"data": [[34.0, 2893.5], [9.0, 4215.5], [37.0, 4797.0], [11.0, 3907.0], [12.0, 2393.0], [3.0, 2472.5], [13.0, 4408.5], [16.0, 4565.0], [5.0, 4631.5], [20.0, 4503.0], [25.0, 2987.0], [26.0, 2982.0], [7.0, 3139.0], [30.0, 4419.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 37.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 2392.5, "minX": 3.0, "maxY": 4797.0, "series": [{"data": [[34.0, 2893.5], [9.0, 4215.5], [37.0, 4797.0], [11.0, 3907.0], [12.0, 2392.5], [3.0, 2472.5], [13.0, 4408.5], [16.0, 4565.0], [5.0, 4631.5], [20.0, 4503.0], [25.0, 2987.0], [26.0, 2982.0], [7.0, 3139.0], [30.0, 4419.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 37.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.71787842E12, "maxY": 5.0, "series": [{"data": [[1.71787842E12, 5.0]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71787842E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.71787842E12, "maxY": 5.0, "series": [{"data": [[1.71787842E12, 5.0]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71787842E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.71787842E12, "maxY": 5.0, "series": [{"data": [[1.71787842E12, 5.0]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71787842E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.71787842E12, "maxY": 5.0, "series": [{"data": [[1.71787842E12, 5.0]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71787842E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

