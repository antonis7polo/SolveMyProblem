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
        data: {"result": {"minY": 543.0, "minX": 0.0, "maxY": 17469.0, "series": [{"data": [[0.0, 543.0], [0.1, 543.0], [0.2, 543.0], [0.3, 543.0], [0.4, 543.0], [0.5, 550.0], [0.6, 550.0], [0.7, 550.0], [0.8, 550.0], [0.9, 550.0], [1.0, 653.0], [1.1, 653.0], [1.2, 653.0], [1.3, 653.0], [1.4, 653.0], [1.5, 659.0], [1.6, 659.0], [1.7, 659.0], [1.8, 659.0], [1.9, 659.0], [2.0, 959.0], [2.1, 959.0], [2.2, 959.0], [2.3, 959.0], [2.4, 959.0], [2.5, 1061.0], [2.6, 1061.0], [2.7, 1061.0], [2.8, 1061.0], [2.9, 1061.0], [3.0, 1154.0], [3.1, 1154.0], [3.2, 1154.0], [3.3, 1154.0], [3.4, 1154.0], [3.5, 1193.0], [3.6, 1193.0], [3.7, 1193.0], [3.8, 1193.0], [3.9, 1193.0], [4.0, 1258.0], [4.1, 1258.0], [4.2, 1258.0], [4.3, 1258.0], [4.4, 1258.0], [4.5, 1296.0], [4.6, 1296.0], [4.7, 1296.0], [4.8, 1296.0], [4.9, 1296.0], [5.0, 1943.0], [5.1, 1943.0], [5.2, 1943.0], [5.3, 1943.0], [5.4, 1943.0], [5.5, 2656.0], [5.6, 2656.0], [5.7, 2656.0], [5.8, 2656.0], [5.9, 2656.0], [6.0, 2717.0], [6.1, 2717.0], [6.2, 2717.0], [6.3, 2717.0], [6.4, 2717.0], [6.5, 2741.0], [6.6, 2741.0], [6.7, 2741.0], [6.8, 2741.0], [6.9, 2741.0], [7.0, 2803.0], [7.1, 2803.0], [7.2, 2803.0], [7.3, 2803.0], [7.4, 2803.0], [7.5, 2849.0], [7.6, 2849.0], [7.7, 2849.0], [7.8, 2849.0], [7.9, 2849.0], [8.0, 2940.0], [8.1, 2940.0], [8.2, 2940.0], [8.3, 2940.0], [8.4, 2940.0], [8.5, 2983.0], [8.6, 2983.0], [8.7, 2983.0], [8.8, 2983.0], [8.9, 2983.0], [9.0, 3037.0], [9.1, 3037.0], [9.2, 3037.0], [9.3, 3037.0], [9.4, 3037.0], [9.5, 3126.0], [9.6, 3126.0], [9.7, 3126.0], [9.8, 3126.0], [9.9, 3126.0], [10.0, 3275.0], [10.1, 3275.0], [10.2, 3275.0], [10.3, 3275.0], [10.4, 3275.0], [10.5, 3354.0], [10.6, 3354.0], [10.7, 3354.0], [10.8, 3354.0], [10.9, 3354.0], [11.0, 3453.0], [11.1, 3453.0], [11.2, 3453.0], [11.3, 3453.0], [11.4, 3453.0], [11.5, 4119.0], [11.6, 4119.0], [11.7, 4119.0], [11.8, 4119.0], [11.9, 4119.0], [12.0, 4208.0], [12.1, 4208.0], [12.2, 4208.0], [12.3, 4208.0], [12.4, 4208.0], [12.5, 4219.0], [12.6, 4219.0], [12.7, 4219.0], [12.8, 4219.0], [12.9, 4219.0], [13.0, 4287.0], [13.1, 4287.0], [13.2, 4287.0], [13.3, 4287.0], [13.4, 4287.0], [13.5, 4299.0], [13.6, 4299.0], [13.7, 4299.0], [13.8, 4299.0], [13.9, 4299.0], [14.0, 4430.0], [14.1, 4430.0], [14.2, 4430.0], [14.3, 4430.0], [14.4, 4430.0], [14.5, 5184.0], [14.6, 5184.0], [14.7, 5184.0], [14.8, 5184.0], [14.9, 5184.0], [15.0, 5737.0], [15.1, 5737.0], [15.2, 5737.0], [15.3, 5737.0], [15.4, 5737.0], [15.5, 6570.0], [15.6, 6570.0], [15.7, 6570.0], [15.8, 6570.0], [15.9, 6570.0], [16.0, 6582.0], [16.1, 6582.0], [16.2, 6582.0], [16.3, 6582.0], [16.4, 6582.0], [16.5, 6614.0], [16.6, 6614.0], [16.7, 6614.0], [16.8, 6614.0], [16.9, 6614.0], [17.0, 6677.0], [17.1, 6677.0], [17.2, 6677.0], [17.3, 6677.0], [17.4, 6677.0], [17.5, 6680.0], [17.6, 6680.0], [17.7, 6680.0], [17.8, 6680.0], [17.9, 6680.0], [18.0, 6775.0], [18.1, 6775.0], [18.2, 6775.0], [18.3, 6775.0], [18.4, 6775.0], [18.5, 6856.0], [18.6, 6856.0], [18.7, 6856.0], [18.8, 6856.0], [18.9, 6856.0], [19.0, 8287.0], [19.1, 8287.0], [19.2, 8287.0], [19.3, 8287.0], [19.4, 8287.0], [19.5, 8375.0], [19.6, 8375.0], [19.7, 8375.0], [19.8, 8375.0], [19.9, 8375.0], [20.0, 8382.0], [20.1, 8382.0], [20.2, 8382.0], [20.3, 8382.0], [20.4, 8382.0], [20.5, 8481.0], [20.6, 8481.0], [20.7, 8481.0], [20.8, 8481.0], [20.9, 8481.0], [21.0, 8581.0], [21.1, 8581.0], [21.2, 8581.0], [21.3, 8581.0], [21.4, 8581.0], [21.5, 8626.0], [21.6, 8626.0], [21.7, 8626.0], [21.8, 8626.0], [21.9, 8626.0], [22.0, 8678.0], [22.1, 8678.0], [22.2, 8678.0], [22.3, 8678.0], [22.4, 8678.0], [22.5, 8711.0], [22.6, 8711.0], [22.7, 8711.0], [22.8, 8711.0], [22.9, 8711.0], [23.0, 8772.0], [23.1, 8772.0], [23.2, 8772.0], [23.3, 8772.0], [23.4, 8772.0], [23.5, 8827.0], [23.6, 8827.0], [23.7, 8827.0], [23.8, 8827.0], [23.9, 8827.0], [24.0, 8912.0], [24.1, 8912.0], [24.2, 8912.0], [24.3, 8912.0], [24.4, 8912.0], [24.5, 8950.0], [24.6, 8950.0], [24.7, 8950.0], [24.8, 8950.0], [24.9, 8950.0], [25.0, 9003.0], [25.1, 9003.0], [25.2, 9003.0], [25.3, 9003.0], [25.4, 9003.0], [25.5, 9034.0], [25.6, 9034.0], [25.7, 9034.0], [25.8, 9034.0], [25.9, 9034.0], [26.0, 9111.0], [26.1, 9111.0], [26.2, 9111.0], [26.3, 9111.0], [26.4, 9111.0], [26.5, 9171.0], [26.6, 9171.0], [26.7, 9171.0], [26.8, 9171.0], [26.9, 9171.0], [27.0, 9203.0], [27.1, 9203.0], [27.2, 9203.0], [27.3, 9203.0], [27.4, 9203.0], [27.5, 9205.0], [27.6, 9205.0], [27.7, 9205.0], [27.8, 9205.0], [27.9, 9205.0], [28.0, 9236.0], [28.1, 9236.0], [28.2, 9236.0], [28.3, 9236.0], [28.4, 9236.0], [28.5, 9244.0], [28.6, 9244.0], [28.7, 9244.0], [28.8, 9244.0], [28.9, 9244.0], [29.0, 9254.0], [29.1, 9254.0], [29.2, 9254.0], [29.3, 9254.0], [29.4, 9254.0], [29.5, 9256.0], [29.6, 9256.0], [29.7, 9256.0], [29.8, 9256.0], [29.9, 9256.0], [30.0, 9293.0], [30.1, 9293.0], [30.2, 9293.0], [30.3, 9293.0], [30.4, 9293.0], [30.5, 9294.0], [30.6, 9294.0], [30.7, 9294.0], [30.8, 9294.0], [30.9, 9294.0], [31.0, 9379.0], [31.1, 9379.0], [31.2, 9379.0], [31.3, 9379.0], [31.4, 9379.0], [31.5, 9493.0], [31.6, 9493.0], [31.7, 9493.0], [31.8, 9493.0], [31.9, 9493.0], [32.0, 9518.0], [32.1, 9518.0], [32.2, 9518.0], [32.3, 9518.0], [32.4, 9518.0], [32.5, 9533.0], [32.6, 9533.0], [32.7, 9533.0], [32.8, 9533.0], [32.9, 9533.0], [33.0, 9625.0], [33.1, 9625.0], [33.2, 9625.0], [33.3, 9625.0], [33.4, 9625.0], [33.5, 9626.0], [33.6, 9626.0], [33.7, 9626.0], [33.8, 9626.0], [33.9, 9626.0], [34.0, 9643.0], [34.1, 9643.0], [34.2, 9643.0], [34.3, 9643.0], [34.4, 9643.0], [34.5, 9702.0], [34.6, 9702.0], [34.7, 9702.0], [34.8, 9702.0], [34.9, 9702.0], [35.0, 9734.0], [35.1, 9734.0], [35.2, 9734.0], [35.3, 9734.0], [35.4, 9734.0], [35.5, 9811.0], [35.6, 9811.0], [35.7, 9811.0], [35.8, 9811.0], [35.9, 9811.0], [36.0, 9815.0], [36.1, 9815.0], [36.2, 9815.0], [36.3, 9815.0], [36.4, 9815.0], [36.5, 9892.0], [36.6, 9892.0], [36.7, 9892.0], [36.8, 9892.0], [36.9, 9892.0], [37.0, 9934.0], [37.1, 9934.0], [37.2, 9934.0], [37.3, 9934.0], [37.4, 9934.0], [37.5, 10025.0], [37.6, 10025.0], [37.7, 10025.0], [37.8, 10025.0], [37.9, 10025.0], [38.0, 10032.0], [38.1, 10032.0], [38.2, 10032.0], [38.3, 10032.0], [38.4, 10032.0], [38.5, 10065.0], [38.6, 10065.0], [38.7, 10065.0], [38.8, 10065.0], [38.9, 10065.0], [39.0, 10107.0], [39.1, 10107.0], [39.2, 10107.0], [39.3, 10107.0], [39.4, 10107.0], [39.5, 10127.0], [39.6, 10127.0], [39.7, 10127.0], [39.8, 10127.0], [39.9, 10127.0], [40.0, 10223.0], [40.1, 10223.0], [40.2, 10223.0], [40.3, 10223.0], [40.4, 10223.0], [40.5, 10231.0], [40.6, 10231.0], [40.7, 10231.0], [40.8, 10231.0], [40.9, 10231.0], [41.0, 10319.0], [41.1, 10319.0], [41.2, 10319.0], [41.3, 10319.0], [41.4, 10319.0], [41.5, 10320.0], [41.6, 10320.0], [41.7, 10320.0], [41.8, 10320.0], [41.9, 10320.0], [42.0, 10337.0], [42.1, 10337.0], [42.2, 10337.0], [42.3, 10337.0], [42.4, 10337.0], [42.5, 10395.0], [42.6, 10395.0], [42.7, 10395.0], [42.8, 10395.0], [42.9, 10395.0], [43.0, 10415.0], [43.1, 10415.0], [43.2, 10415.0], [43.3, 10415.0], [43.4, 10415.0], [43.5, 10449.0], [43.6, 10449.0], [43.7, 10449.0], [43.8, 10449.0], [43.9, 10449.0], [44.0, 10492.0], [44.1, 10492.0], [44.2, 10492.0], [44.3, 10492.0], [44.4, 10492.0], [44.5, 10575.0], [44.6, 10575.0], [44.7, 10575.0], [44.8, 10575.0], [44.9, 10575.0], [45.0, 10675.0], [45.1, 10675.0], [45.2, 10675.0], [45.3, 10675.0], [45.4, 10675.0], [45.5, 10777.0], [45.6, 10777.0], [45.7, 10777.0], [45.8, 10777.0], [45.9, 10777.0], [46.0, 10876.0], [46.1, 10876.0], [46.2, 10876.0], [46.3, 10876.0], [46.4, 10876.0], [46.5, 10925.0], [46.6, 10925.0], [46.7, 10925.0], [46.8, 10925.0], [46.9, 10925.0], [47.0, 11149.0], [47.1, 11149.0], [47.2, 11149.0], [47.3, 11149.0], [47.4, 11149.0], [47.5, 11154.0], [47.6, 11154.0], [47.7, 11154.0], [47.8, 11154.0], [47.9, 11154.0], [48.0, 11169.0], [48.1, 11169.0], [48.2, 11169.0], [48.3, 11169.0], [48.4, 11169.0], [48.5, 11251.0], [48.6, 11251.0], [48.7, 11251.0], [48.8, 11251.0], [48.9, 11251.0], [49.0, 11342.0], [49.1, 11342.0], [49.2, 11342.0], [49.3, 11342.0], [49.4, 11342.0], [49.5, 11373.0], [49.6, 11373.0], [49.7, 11373.0], [49.8, 11373.0], [49.9, 11373.0], [50.0, 11453.0], [50.1, 11453.0], [50.2, 11453.0], [50.3, 11453.0], [50.4, 11453.0], [50.5, 11539.0], [50.6, 11539.0], [50.7, 11539.0], [50.8, 11539.0], [50.9, 11539.0], [51.0, 11626.0], [51.1, 11626.0], [51.2, 11626.0], [51.3, 11626.0], [51.4, 11626.0], [51.5, 11652.0], [51.6, 11652.0], [51.7, 11652.0], [51.8, 11652.0], [51.9, 11652.0], [52.0, 11791.0], [52.1, 11791.0], [52.2, 11791.0], [52.3, 11791.0], [52.4, 11791.0], [52.5, 11828.0], [52.6, 11828.0], [52.7, 11828.0], [52.8, 11828.0], [52.9, 11828.0], [53.0, 11869.0], [53.1, 11869.0], [53.2, 11869.0], [53.3, 11869.0], [53.4, 11869.0], [53.5, 11937.0], [53.6, 11937.0], [53.7, 11937.0], [53.8, 11937.0], [53.9, 11937.0], [54.0, 12040.0], [54.1, 12040.0], [54.2, 12040.0], [54.3, 12040.0], [54.4, 12040.0], [54.5, 12052.0], [54.6, 12052.0], [54.7, 12052.0], [54.8, 12052.0], [54.9, 12052.0], [55.0, 12129.0], [55.1, 12129.0], [55.2, 12129.0], [55.3, 12129.0], [55.4, 12129.0], [55.5, 12129.0], [55.6, 12129.0], [55.7, 12129.0], [55.8, 12129.0], [55.9, 12129.0], [56.0, 12134.0], [56.1, 12134.0], [56.2, 12134.0], [56.3, 12134.0], [56.4, 12134.0], [56.5, 12195.0], [56.6, 12195.0], [56.7, 12195.0], [56.8, 12195.0], [56.9, 12195.0], [57.0, 12230.0], [57.1, 12230.0], [57.2, 12230.0], [57.3, 12230.0], [57.4, 12230.0], [57.5, 14130.0], [57.6, 14130.0], [57.7, 14130.0], [57.8, 14130.0], [57.9, 14130.0], [58.0, 14140.0], [58.1, 14140.0], [58.2, 14140.0], [58.3, 14140.0], [58.4, 14140.0], [58.5, 14168.0], [58.6, 14168.0], [58.7, 14168.0], [58.8, 14168.0], [58.9, 14168.0], [59.0, 14200.0], [59.1, 14200.0], [59.2, 14200.0], [59.3, 14200.0], [59.4, 14200.0], [59.5, 14226.0], [59.6, 14226.0], [59.7, 14226.0], [59.8, 14226.0], [59.9, 14226.0], [60.0, 14232.0], [60.1, 14232.0], [60.2, 14232.0], [60.3, 14232.0], [60.4, 14232.0], [60.5, 14238.0], [60.6, 14238.0], [60.7, 14238.0], [60.8, 14238.0], [60.9, 14238.0], [61.0, 14287.0], [61.1, 14287.0], [61.2, 14287.0], [61.3, 14287.0], [61.4, 14287.0], [61.5, 14318.0], [61.6, 14318.0], [61.7, 14318.0], [61.8, 14318.0], [61.9, 14318.0], [62.0, 14341.0], [62.1, 14341.0], [62.2, 14341.0], [62.3, 14341.0], [62.4, 14341.0], [62.5, 14378.0], [62.6, 14378.0], [62.7, 14378.0], [62.8, 14378.0], [62.9, 14378.0], [63.0, 14398.0], [63.1, 14398.0], [63.2, 14398.0], [63.3, 14398.0], [63.4, 14398.0], [63.5, 14420.0], [63.6, 14420.0], [63.7, 14420.0], [63.8, 14420.0], [63.9, 14420.0], [64.0, 14443.0], [64.1, 14443.0], [64.2, 14443.0], [64.3, 14443.0], [64.4, 14443.0], [64.5, 14473.0], [64.6, 14473.0], [64.7, 14473.0], [64.8, 14473.0], [64.9, 14473.0], [65.0, 14490.0], [65.1, 14490.0], [65.2, 14490.0], [65.3, 14490.0], [65.4, 14490.0], [65.5, 14505.0], [65.6, 14505.0], [65.7, 14505.0], [65.8, 14505.0], [65.9, 14505.0], [66.0, 14523.0], [66.1, 14523.0], [66.2, 14523.0], [66.3, 14523.0], [66.4, 14523.0], [66.5, 14523.0], [66.6, 14523.0], [66.7, 14523.0], [66.8, 14523.0], [66.9, 14523.0], [67.0, 14529.0], [67.1, 14529.0], [67.2, 14529.0], [67.3, 14529.0], [67.4, 14529.0], [67.5, 14560.0], [67.6, 14560.0], [67.7, 14560.0], [67.8, 14560.0], [67.9, 14560.0], [68.0, 14597.0], [68.1, 14597.0], [68.2, 14597.0], [68.3, 14597.0], [68.4, 14597.0], [68.5, 14750.0], [68.6, 14750.0], [68.7, 14750.0], [68.8, 14750.0], [68.9, 14750.0], [69.0, 14820.0], [69.1, 14820.0], [69.2, 14820.0], [69.3, 14820.0], [69.4, 14820.0], [69.5, 14838.0], [69.6, 14838.0], [69.7, 14838.0], [69.8, 14838.0], [69.9, 14838.0], [70.0, 14918.0], [70.1, 14918.0], [70.2, 14918.0], [70.3, 14918.0], [70.4, 14918.0], [70.5, 14933.0], [70.6, 14933.0], [70.7, 14933.0], [70.8, 14933.0], [70.9, 14933.0], [71.0, 15190.0], [71.1, 15190.0], [71.2, 15190.0], [71.3, 15190.0], [71.4, 15190.0], [71.5, 15315.0], [71.6, 15315.0], [71.7, 15315.0], [71.8, 15315.0], [71.9, 15315.0], [72.0, 15388.0], [72.1, 15388.0], [72.2, 15388.0], [72.3, 15388.0], [72.4, 15388.0], [72.5, 15410.0], [72.6, 15410.0], [72.7, 15410.0], [72.8, 15410.0], [72.9, 15410.0], [73.0, 15483.0], [73.1, 15483.0], [73.2, 15483.0], [73.3, 15483.0], [73.4, 15483.0], [73.5, 15519.0], [73.6, 15519.0], [73.7, 15519.0], [73.8, 15519.0], [73.9, 15519.0], [74.0, 15527.0], [74.1, 15527.0], [74.2, 15527.0], [74.3, 15527.0], [74.4, 15527.0], [74.5, 15556.0], [74.6, 15556.0], [74.7, 15556.0], [74.8, 15556.0], [74.9, 15556.0], [75.0, 15575.0], [75.1, 15575.0], [75.2, 15575.0], [75.3, 15575.0], [75.4, 15575.0], [75.5, 15588.0], [75.6, 15588.0], [75.7, 15588.0], [75.8, 15588.0], [75.9, 15588.0], [76.0, 15588.0], [76.1, 15588.0], [76.2, 15588.0], [76.3, 15588.0], [76.4, 15588.0], [76.5, 15608.0], [76.6, 15608.0], [76.7, 15608.0], [76.8, 15608.0], [76.9, 15608.0], [77.0, 15618.0], [77.1, 15618.0], [77.2, 15618.0], [77.3, 15618.0], [77.4, 15618.0], [77.5, 15628.0], [77.6, 15628.0], [77.7, 15628.0], [77.8, 15628.0], [77.9, 15628.0], [78.0, 15664.0], [78.1, 15664.0], [78.2, 15664.0], [78.3, 15664.0], [78.4, 15664.0], [78.5, 15732.0], [78.6, 15732.0], [78.7, 15732.0], [78.8, 15732.0], [78.9, 15732.0], [79.0, 15811.0], [79.1, 15811.0], [79.2, 15811.0], [79.3, 15811.0], [79.4, 15811.0], [79.5, 15904.0], [79.6, 15904.0], [79.7, 15904.0], [79.8, 15904.0], [79.9, 15904.0], [80.0, 16003.0], [80.1, 16003.0], [80.2, 16003.0], [80.3, 16003.0], [80.4, 16003.0], [80.5, 16115.0], [80.6, 16115.0], [80.7, 16115.0], [80.8, 16115.0], [80.9, 16115.0], [81.0, 16196.0], [81.1, 16196.0], [81.2, 16196.0], [81.3, 16196.0], [81.4, 16196.0], [81.5, 16270.0], [81.6, 16270.0], [81.7, 16270.0], [81.8, 16270.0], [81.9, 16270.0], [82.0, 16271.0], [82.1, 16271.0], [82.2, 16271.0], [82.3, 16271.0], [82.4, 16271.0], [82.5, 16290.0], [82.6, 16290.0], [82.7, 16290.0], [82.8, 16290.0], [82.9, 16290.0], [83.0, 16301.0], [83.1, 16301.0], [83.2, 16301.0], [83.3, 16301.0], [83.4, 16301.0], [83.5, 16316.0], [83.6, 16316.0], [83.7, 16316.0], [83.8, 16316.0], [83.9, 16316.0], [84.0, 16356.0], [84.1, 16356.0], [84.2, 16356.0], [84.3, 16356.0], [84.4, 16356.0], [84.5, 16376.0], [84.6, 16376.0], [84.7, 16376.0], [84.8, 16376.0], [84.9, 16376.0], [85.0, 16387.0], [85.1, 16387.0], [85.2, 16387.0], [85.3, 16387.0], [85.4, 16387.0], [85.5, 16397.0], [85.6, 16397.0], [85.7, 16397.0], [85.8, 16397.0], [85.9, 16397.0], [86.0, 16479.0], [86.1, 16479.0], [86.2, 16479.0], [86.3, 16479.0], [86.4, 16479.0], [86.5, 16490.0], [86.6, 16490.0], [86.7, 16490.0], [86.8, 16490.0], [86.9, 16490.0], [87.0, 16493.0], [87.1, 16493.0], [87.2, 16493.0], [87.3, 16493.0], [87.4, 16493.0], [87.5, 16523.0], [87.6, 16523.0], [87.7, 16523.0], [87.8, 16523.0], [87.9, 16523.0], [88.0, 16560.0], [88.1, 16560.0], [88.2, 16560.0], [88.3, 16560.0], [88.4, 16560.0], [88.5, 16576.0], [88.6, 16576.0], [88.7, 16576.0], [88.8, 16576.0], [88.9, 16576.0], [89.0, 16580.0], [89.1, 16580.0], [89.2, 16580.0], [89.3, 16580.0], [89.4, 16580.0], [89.5, 16588.0], [89.6, 16588.0], [89.7, 16588.0], [89.8, 16588.0], [89.9, 16588.0], [90.0, 16593.0], [90.1, 16593.0], [90.2, 16593.0], [90.3, 16593.0], [90.4, 16593.0], [90.5, 16610.0], [90.6, 16610.0], [90.7, 16610.0], [90.8, 16610.0], [90.9, 16610.0], [91.0, 16641.0], [91.1, 16641.0], [91.2, 16641.0], [91.3, 16641.0], [91.4, 16641.0], [91.5, 16684.0], [91.6, 16684.0], [91.7, 16684.0], [91.8, 16684.0], [91.9, 16684.0], [92.0, 16686.0], [92.1, 16686.0], [92.2, 16686.0], [92.3, 16686.0], [92.4, 16686.0], [92.5, 16780.0], [92.6, 16780.0], [92.7, 16780.0], [92.8, 16780.0], [92.9, 16780.0], [93.0, 16784.0], [93.1, 16784.0], [93.2, 16784.0], [93.3, 16784.0], [93.4, 16784.0], [93.5, 16879.0], [93.6, 16879.0], [93.7, 16879.0], [93.8, 16879.0], [93.9, 16879.0], [94.0, 16880.0], [94.1, 16880.0], [94.2, 16880.0], [94.3, 16880.0], [94.4, 16880.0], [94.5, 16980.0], [94.6, 16980.0], [94.7, 16980.0], [94.8, 16980.0], [94.9, 16980.0], [95.0, 16980.0], [95.1, 16980.0], [95.2, 16980.0], [95.3, 16980.0], [95.4, 16980.0], [95.5, 17075.0], [95.6, 17075.0], [95.7, 17075.0], [95.8, 17075.0], [95.9, 17075.0], [96.0, 17075.0], [96.1, 17075.0], [96.2, 17075.0], [96.3, 17075.0], [96.4, 17075.0], [96.5, 17172.0], [96.6, 17172.0], [96.7, 17172.0], [96.8, 17172.0], [96.9, 17172.0], [97.0, 17178.0], [97.1, 17178.0], [97.2, 17178.0], [97.3, 17178.0], [97.4, 17178.0], [97.5, 17264.0], [97.6, 17264.0], [97.7, 17264.0], [97.8, 17264.0], [97.9, 17264.0], [98.0, 17275.0], [98.1, 17275.0], [98.2, 17275.0], [98.3, 17275.0], [98.4, 17275.0], [98.5, 17369.0], [98.6, 17369.0], [98.7, 17369.0], [98.8, 17369.0], [98.9, 17369.0], [99.0, 17376.0], [99.1, 17376.0], [99.2, 17376.0], [99.3, 17376.0], [99.4, 17376.0], [99.5, 17469.0], [99.6, 17469.0], [99.7, 17469.0], [99.8, 17469.0], [99.9, 17469.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 500.0, "maxY": 8.0, "series": [{"data": [[600.0, 2.0], [900.0, 1.0], [1000.0, 1.0], [1100.0, 2.0], [1200.0, 2.0], [1900.0, 1.0], [2600.0, 1.0], [2800.0, 2.0], [2700.0, 2.0], [2900.0, 2.0], [3000.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [4200.0, 4.0], [4100.0, 1.0], [4400.0, 1.0], [5100.0, 1.0], [5700.0, 1.0], [6500.0, 2.0], [6600.0, 3.0], [6800.0, 1.0], [6700.0, 1.0], [8600.0, 2.0], [8500.0, 1.0], [8400.0, 1.0], [8300.0, 2.0], [8200.0, 1.0], [8700.0, 2.0], [9200.0, 8.0], [9000.0, 2.0], [9100.0, 2.0], [8800.0, 1.0], [8900.0, 2.0], [9700.0, 2.0], [9600.0, 3.0], [9500.0, 2.0], [9300.0, 1.0], [9400.0, 1.0], [10100.0, 2.0], [10000.0, 3.0], [10200.0, 2.0], [9800.0, 3.0], [9900.0, 1.0], [10400.0, 3.0], [10300.0, 4.0], [10500.0, 1.0], [10700.0, 1.0], [10600.0, 1.0], [11100.0, 3.0], [11200.0, 1.0], [10800.0, 1.0], [10900.0, 1.0], [11500.0, 1.0], [11600.0, 2.0], [11300.0, 2.0], [11400.0, 1.0], [11700.0, 1.0], [12000.0, 2.0], [11900.0, 1.0], [11800.0, 2.0], [12100.0, 4.0], [12200.0, 1.0], [14300.0, 4.0], [14200.0, 5.0], [14100.0, 3.0], [14800.0, 2.0], [14700.0, 1.0], [14400.0, 4.0], [14500.0, 6.0], [15300.0, 2.0], [15100.0, 1.0], [14900.0, 2.0], [15500.0, 6.0], [15400.0, 2.0], [15600.0, 4.0], [15800.0, 1.0], [15700.0, 1.0], [16300.0, 6.0], [16200.0, 3.0], [16100.0, 2.0], [16000.0, 1.0], [15900.0, 1.0], [17200.0, 2.0], [17400.0, 1.0], [17300.0, 2.0], [17100.0, 2.0], [17000.0, 2.0], [16900.0, 2.0], [16700.0, 2.0], [16800.0, 2.0], [16600.0, 4.0], [16500.0, 6.0], [16400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 17400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 10.0, "minX": 1.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 190.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 10.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 190.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 26.24137931034483, "minX": 1.71785124E12, "maxY": 68.39766081871342, "series": [{"data": [[1.71785124E12, 26.24137931034483], [1.7178513E12, 68.39766081871342]], "isOverall": false, "label": "Log In", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7178513E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 4154.2, "minX": 1.0, "maxY": 17469.0, "series": [{"data": [[2.0, 16641.0], [3.0, 16610.0], [4.0, 16560.0], [5.0, 16523.0], [6.0, 16479.0], [7.0, 8617.5], [8.0, 8461.5], [9.0, 5816.333333333333], [10.0, 16316.0], [11.0, 16376.0], [12.0, 16271.0], [13.0, 4154.2], [14.0, 6282.666666666667], [15.0, 16493.0], [16.0, 16593.0], [17.0, 16686.0], [18.0, 16784.0], [19.0, 16879.0], [20.0, 16980.0], [21.0, 9509.0], [22.0, 17376.0], [23.0, 17172.0], [24.0, 17264.0], [25.0, 15588.0], [26.0, 15664.0], [27.0, 15588.0], [28.0, 9202.5], [29.0, 5948.5], [30.0, 5550.8], [31.0, 9236.5], [32.0, 9377.0], [33.0, 15527.0], [35.0, 9632.0], [34.0, 9734.5], [37.0, 16003.0], [36.0, 15904.0], [39.0, 16290.0], [38.0, 16196.0], [41.0, 16387.0], [40.0, 16490.0], [43.0, 7349.5], [42.0, 10353.5], [44.0, 10589.5], [45.0, 10605.0], [47.0, 17075.0], [46.0, 16980.0], [49.0, 17178.0], [48.0, 17275.0], [51.0, 17369.0], [50.0, 17469.0], [52.0, 9853.5], [53.0, 14597.0], [55.0, 14529.0], [54.0, 14560.0], [57.0, 14473.0], [56.0, 14505.0], [58.0, 10090.0], [59.0, 14420.0], [61.0, 14341.0], [60.0, 14378.0], [63.0, 14287.0], [62.0, 14318.0], [66.0, 9106.666666666666], [67.0, 8550.75], [65.0, 14200.0], [64.0, 14238.0], [69.0, 10689.5], [68.0, 10452.5], [71.0, 14918.0], [70.0, 14820.0], [75.0, 14140.0], [74.0, 15608.0], [73.0, 15410.0], [72.0, 15315.0], [79.0, 14750.0], [78.0, 14490.0], [77.0, 14398.0], [76.0, 14226.0], [83.0, 15388.0], [82.0, 15190.0], [81.0, 14885.5], [87.0, 10910.5], [86.0, 10178.666666666666], [85.0, 15575.0], [84.0, 15483.0], [91.0, 10326.0], [90.0, 9805.4], [89.0, 9841.5], [88.0, 10342.666666666666], [95.0, 10065.0], [94.0, 10297.0], [93.0, 9690.285714285714], [92.0, 9978.0], [99.0, 10377.75], [98.0, 10064.5], [97.0, 9379.666666666666], [96.0, 10202.666666666666], [103.0, 10009.75], [102.0, 9964.75], [101.0, 10129.0], [100.0, 9597.0], [105.0, 10114.666666666666], [104.0, 10018.0], [107.0, 11342.0], [106.0, 11453.0], [111.0, 11604.5], [110.0, 11539.0], [109.0, 11781.5], [112.0, 10201.0], [1.0, 16580.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[62.28500000000009, 11256.185000000005]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 112.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 119.25, "minX": 1.71785124E12, "maxY": 1907.6333333333334, "series": [{"data": [[1.71785124E12, 323.56666666666666], [1.7178513E12, 1907.6333333333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71785124E12, 119.25], [1.7178513E12, 703.0333333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7178513E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 2509.137931034483, "minX": 1.71785124E12, "maxY": 12739.602339181294, "series": [{"data": [[1.71785124E12, 2509.137931034483], [1.7178513E12, 12739.602339181294]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7178513E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 2509.0344827586214, "minX": 1.71785124E12, "maxY": 12739.567251461986, "series": [{"data": [[1.71785124E12, 2509.0344827586214], [1.7178513E12, 12739.567251461986]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7178513E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 2.596491228070176, "minX": 1.71785124E12, "maxY": 8.482758620689651, "series": [{"data": [[1.71785124E12, 8.482758620689651], [1.7178513E12, 2.596491228070176]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7178513E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 543.0, "minX": 1.71785124E12, "maxY": 17469.0, "series": [{"data": [[1.71785124E12, 4430.0], [1.7178513E12, 17469.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71785124E12, 4287.0], [1.7178513E12, 16675.4]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71785124E12, 4430.0], [1.7178513E12, 17402.04]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71785124E12, 4364.5], [1.7178513E12, 17075.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.71785124E12, 543.0], [1.7178513E12, 5184.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71785124E12, 2803.0], [1.7178513E12, 12230.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7178513E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 2803.0, "minX": 1.0, "maxY": 16686.0, "series": [{"data": [[2.0, 11037.0], [8.0, 14489.0], [10.0, 9979.5], [11.0, 12230.0], [3.0, 2803.0], [14.0, 14329.5], [15.0, 16686.0], [4.0, 10472.5], [1.0, 5737.0], [16.0, 9249.5], [17.0, 11342.0], [6.0, 4253.0], [27.0, 16196.0], [7.0, 9034.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 27.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 2803.0, "minX": 1.0, "maxY": 16686.0, "series": [{"data": [[2.0, 11037.0], [8.0, 14488.5], [10.0, 9979.5], [11.0, 12230.0], [3.0, 2803.0], [14.0, 14329.5], [15.0, 16686.0], [4.0, 10472.5], [1.0, 5737.0], [16.0, 9249.5], [17.0, 11342.0], [6.0, 4253.0], [27.0, 16196.0], [7.0, 9034.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 27.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.2333333333333334, "minX": 1.71785124E12, "maxY": 2.1, "series": [{"data": [[1.71785124E12, 1.2333333333333334], [1.7178513E12, 2.1]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7178513E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.48333333333333334, "minX": 1.71785124E12, "maxY": 2.85, "series": [{"data": [[1.71785124E12, 0.48333333333333334], [1.7178513E12, 2.85]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7178513E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.48333333333333334, "minX": 1.71785124E12, "maxY": 2.85, "series": [{"data": [[1.71785124E12, 0.48333333333333334], [1.7178513E12, 2.85]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7178513E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.48333333333333334, "minX": 1.71785124E12, "maxY": 2.85, "series": [{"data": [[1.71785124E12, 0.48333333333333334], [1.7178513E12, 2.85]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7178513E12, "title": "Total Transactions Per Second"}},
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

