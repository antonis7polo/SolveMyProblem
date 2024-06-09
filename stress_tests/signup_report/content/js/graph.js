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
        data: {"result": {"minY": 1156.0, "minX": 0.0, "maxY": 29351.0, "series": [{"data": [[0.0, 1156.0], [0.1, 1156.0], [0.2, 1156.0], [0.3, 1156.0], [0.4, 1156.0], [0.5, 1156.0], [0.6, 1156.0], [0.7, 1156.0], [0.8, 1156.0], [0.9, 1156.0], [1.0, 1328.0], [1.1, 1328.0], [1.2, 1328.0], [1.3, 1328.0], [1.4, 1328.0], [1.5, 1352.0], [1.6, 1352.0], [1.7, 1352.0], [1.8, 1352.0], [1.9, 1352.0], [2.0, 1852.0], [2.1, 1852.0], [2.2, 1852.0], [2.3, 1852.0], [2.4, 1852.0], [2.5, 1959.0], [2.6, 1959.0], [2.7, 1959.0], [2.8, 1959.0], [2.9, 1959.0], [3.0, 1962.0], [3.1, 1962.0], [3.2, 1962.0], [3.3, 1962.0], [3.4, 1962.0], [3.5, 2005.0], [3.6, 2005.0], [3.7, 2005.0], [3.8, 2005.0], [3.9, 2005.0], [4.0, 2092.0], [4.1, 2092.0], [4.2, 2092.0], [4.3, 2092.0], [4.4, 2092.0], [4.5, 2223.0], [4.6, 2223.0], [4.7, 2223.0], [4.8, 2223.0], [4.9, 2223.0], [5.0, 2387.0], [5.1, 2387.0], [5.2, 2387.0], [5.3, 2387.0], [5.4, 2387.0], [5.5, 2968.0], [5.6, 2968.0], [5.7, 2968.0], [5.8, 2968.0], [5.9, 2968.0], [6.0, 3048.0], [6.1, 3048.0], [6.2, 3048.0], [6.3, 3048.0], [6.4, 3048.0], [6.5, 3067.0], [6.6, 3067.0], [6.7, 3067.0], [6.8, 3067.0], [6.9, 3067.0], [7.0, 3134.0], [7.1, 3134.0], [7.2, 3134.0], [7.3, 3134.0], [7.4, 3134.0], [7.5, 3142.0], [7.6, 3142.0], [7.7, 3142.0], [7.8, 3142.0], [7.9, 3142.0], [8.0, 3256.0], [8.1, 3256.0], [8.2, 3256.0], [8.3, 3256.0], [8.4, 3256.0], [8.5, 3385.0], [8.6, 3385.0], [8.7, 3385.0], [8.8, 3385.0], [8.9, 3385.0], [9.0, 3472.0], [9.1, 3472.0], [9.2, 3472.0], [9.3, 3472.0], [9.4, 3472.0], [9.5, 3482.0], [9.6, 3482.0], [9.7, 3482.0], [9.8, 3482.0], [9.9, 3482.0], [10.0, 3569.0], [10.1, 3569.0], [10.2, 3569.0], [10.3, 3569.0], [10.4, 3569.0], [10.5, 3687.0], [10.6, 3687.0], [10.7, 3687.0], [10.8, 3687.0], [10.9, 3687.0], [11.0, 3813.0], [11.1, 3813.0], [11.2, 3813.0], [11.3, 3813.0], [11.4, 3813.0], [11.5, 3873.0], [11.6, 3873.0], [11.7, 3873.0], [11.8, 3873.0], [11.9, 3873.0], [12.0, 3918.0], [12.1, 3918.0], [12.2, 3918.0], [12.3, 3918.0], [12.4, 3918.0], [12.5, 3924.0], [12.6, 3924.0], [12.7, 3924.0], [12.8, 3924.0], [12.9, 3924.0], [13.0, 3982.0], [13.1, 3982.0], [13.2, 3982.0], [13.3, 3982.0], [13.4, 3982.0], [13.5, 4032.0], [13.6, 4032.0], [13.7, 4032.0], [13.8, 4032.0], [13.9, 4032.0], [14.0, 4095.0], [14.1, 4095.0], [14.2, 4095.0], [14.3, 4095.0], [14.4, 4095.0], [14.5, 4167.0], [14.6, 4167.0], [14.7, 4167.0], [14.8, 4167.0], [14.9, 4167.0], [15.0, 4213.0], [15.1, 4213.0], [15.2, 4213.0], [15.3, 4213.0], [15.4, 4213.0], [15.5, 4262.0], [15.6, 4262.0], [15.7, 4262.0], [15.8, 4262.0], [15.9, 4262.0], [16.0, 4355.0], [16.1, 4355.0], [16.2, 4355.0], [16.3, 4355.0], [16.4, 4355.0], [16.5, 4466.0], [16.6, 4466.0], [16.7, 4466.0], [16.8, 4466.0], [16.9, 4466.0], [17.0, 4517.0], [17.1, 4517.0], [17.2, 4517.0], [17.3, 4517.0], [17.4, 4517.0], [17.5, 4615.0], [17.6, 4615.0], [17.7, 4615.0], [17.8, 4615.0], [17.9, 4615.0], [18.0, 4672.0], [18.1, 4672.0], [18.2, 4672.0], [18.3, 4672.0], [18.4, 4672.0], [18.5, 4707.0], [18.6, 4707.0], [18.7, 4707.0], [18.8, 4707.0], [18.9, 4707.0], [19.0, 4780.0], [19.1, 4780.0], [19.2, 4780.0], [19.3, 4780.0], [19.4, 4780.0], [19.5, 4849.0], [19.6, 4849.0], [19.7, 4849.0], [19.8, 4849.0], [19.9, 4849.0], [20.0, 4918.0], [20.1, 4918.0], [20.2, 4918.0], [20.3, 4918.0], [20.4, 4918.0], [20.5, 5008.0], [20.6, 5008.0], [20.7, 5008.0], [20.8, 5008.0], [20.9, 5008.0], [21.0, 5108.0], [21.1, 5108.0], [21.2, 5108.0], [21.3, 5108.0], [21.4, 5108.0], [21.5, 5161.0], [21.6, 5161.0], [21.7, 5161.0], [21.8, 5161.0], [21.9, 5161.0], [22.0, 5226.0], [22.1, 5226.0], [22.2, 5226.0], [22.3, 5226.0], [22.4, 5226.0], [22.5, 5341.0], [22.6, 5341.0], [22.7, 5341.0], [22.8, 5341.0], [22.9, 5341.0], [23.0, 5494.0], [23.1, 5494.0], [23.2, 5494.0], [23.3, 5494.0], [23.4, 5494.0], [23.5, 5614.0], [23.6, 5614.0], [23.7, 5614.0], [23.8, 5614.0], [23.9, 5614.0], [24.0, 5672.0], [24.1, 5672.0], [24.2, 5672.0], [24.3, 5672.0], [24.4, 5672.0], [24.5, 5710.0], [24.6, 5710.0], [24.7, 5710.0], [24.8, 5710.0], [24.9, 5710.0], [25.0, 5726.0], [25.1, 5726.0], [25.2, 5726.0], [25.3, 5726.0], [25.4, 5726.0], [25.5, 5821.0], [25.6, 5821.0], [25.7, 5821.0], [25.8, 5821.0], [25.9, 5821.0], [26.0, 5908.0], [26.1, 5908.0], [26.2, 5908.0], [26.3, 5908.0], [26.4, 5908.0], [26.5, 5966.0], [26.6, 5966.0], [26.7, 5966.0], [26.8, 5966.0], [26.9, 5966.0], [27.0, 6011.0], [27.1, 6011.0], [27.2, 6011.0], [27.3, 6011.0], [27.4, 6011.0], [27.5, 6121.0], [27.6, 6121.0], [27.7, 6121.0], [27.8, 6121.0], [27.9, 6121.0], [28.0, 6227.0], [28.1, 6227.0], [28.2, 6227.0], [28.3, 6227.0], [28.4, 6227.0], [28.5, 6353.0], [28.6, 6353.0], [28.7, 6353.0], [28.8, 6353.0], [28.9, 6353.0], [29.0, 8736.0], [29.1, 8736.0], [29.2, 8736.0], [29.3, 8736.0], [29.4, 8736.0], [29.5, 9748.0], [29.6, 9748.0], [29.7, 9748.0], [29.8, 9748.0], [29.9, 9748.0], [30.0, 10125.0], [30.1, 10125.0], [30.2, 10125.0], [30.3, 10125.0], [30.4, 10125.0], [30.5, 10639.0], [30.6, 10639.0], [30.7, 10639.0], [30.8, 10639.0], [30.9, 10639.0], [31.0, 10710.0], [31.1, 10710.0], [31.2, 10710.0], [31.3, 10710.0], [31.4, 10710.0], [31.5, 10727.0], [31.6, 10727.0], [31.7, 10727.0], [31.8, 10727.0], [31.9, 10727.0], [32.0, 10730.0], [32.1, 10730.0], [32.2, 10730.0], [32.3, 10730.0], [32.4, 10730.0], [32.5, 11313.0], [32.6, 11313.0], [32.7, 11313.0], [32.8, 11313.0], [32.9, 11313.0], [33.0, 11429.0], [33.1, 11429.0], [33.2, 11429.0], [33.3, 11429.0], [33.4, 11429.0], [33.5, 13028.0], [33.6, 13028.0], [33.7, 13028.0], [33.8, 13028.0], [33.9, 13028.0], [34.0, 13332.0], [34.1, 13332.0], [34.2, 13332.0], [34.3, 13332.0], [34.4, 13332.0], [34.5, 13418.0], [34.6, 13418.0], [34.7, 13418.0], [34.8, 13418.0], [34.9, 13418.0], [35.0, 13483.0], [35.1, 13483.0], [35.2, 13483.0], [35.3, 13483.0], [35.4, 13483.0], [35.5, 13630.0], [35.6, 13630.0], [35.7, 13630.0], [35.8, 13630.0], [35.9, 13630.0], [36.0, 14375.0], [36.1, 14375.0], [36.2, 14375.0], [36.3, 14375.0], [36.4, 14375.0], [36.5, 16673.0], [36.6, 16673.0], [36.7, 16673.0], [36.8, 16673.0], [36.9, 16673.0], [37.0, 16761.0], [37.1, 16761.0], [37.2, 16761.0], [37.3, 16761.0], [37.4, 16761.0], [37.5, 16856.0], [37.6, 16856.0], [37.7, 16856.0], [37.8, 16856.0], [37.9, 16856.0], [38.0, 17878.0], [38.1, 17878.0], [38.2, 17878.0], [38.3, 17878.0], [38.4, 17878.0], [38.5, 17964.0], [38.6, 17964.0], [38.7, 17964.0], [38.8, 17964.0], [38.9, 17964.0], [39.0, 18088.0], [39.1, 18088.0], [39.2, 18088.0], [39.3, 18088.0], [39.4, 18088.0], [39.5, 18793.0], [39.6, 18793.0], [39.7, 18793.0], [39.8, 18793.0], [39.9, 18793.0], [40.0, 18888.0], [40.1, 18888.0], [40.2, 18888.0], [40.3, 18888.0], [40.4, 18888.0], [40.5, 19305.0], [40.6, 19305.0], [40.7, 19305.0], [40.8, 19305.0], [40.9, 19305.0], [41.0, 19408.0], [41.1, 19408.0], [41.2, 19408.0], [41.3, 19408.0], [41.4, 19408.0], [41.5, 19600.0], [41.6, 19600.0], [41.7, 19600.0], [41.8, 19600.0], [41.9, 19600.0], [42.0, 19695.0], [42.1, 19695.0], [42.2, 19695.0], [42.3, 19695.0], [42.4, 19695.0], [42.5, 19779.0], [42.6, 19779.0], [42.7, 19779.0], [42.8, 19779.0], [42.9, 19779.0], [43.0, 19844.0], [43.1, 19844.0], [43.2, 19844.0], [43.3, 19844.0], [43.4, 19844.0], [43.5, 19850.0], [43.6, 19850.0], [43.7, 19850.0], [43.8, 19850.0], [43.9, 19850.0], [44.0, 19950.0], [44.1, 19950.0], [44.2, 19950.0], [44.3, 19950.0], [44.4, 19950.0], [44.5, 19984.0], [44.6, 19984.0], [44.7, 19984.0], [44.8, 19984.0], [44.9, 19984.0], [45.0, 20226.0], [45.1, 20226.0], [45.2, 20226.0], [45.3, 20226.0], [45.4, 20226.0], [45.5, 20323.0], [45.6, 20323.0], [45.7, 20323.0], [45.8, 20323.0], [45.9, 20323.0], [46.0, 20464.0], [46.1, 20464.0], [46.2, 20464.0], [46.3, 20464.0], [46.4, 20464.0], [46.5, 20827.0], [46.6, 20827.0], [46.7, 20827.0], [46.8, 20827.0], [46.9, 20827.0], [47.0, 20857.0], [47.1, 20857.0], [47.2, 20857.0], [47.3, 20857.0], [47.4, 20857.0], [47.5, 21063.0], [47.6, 21063.0], [47.7, 21063.0], [47.8, 21063.0], [47.9, 21063.0], [48.0, 21167.0], [48.1, 21167.0], [48.2, 21167.0], [48.3, 21167.0], [48.4, 21167.0], [48.5, 21500.0], [48.6, 21500.0], [48.7, 21500.0], [48.8, 21500.0], [48.9, 21500.0], [49.0, 21585.0], [49.1, 21585.0], [49.2, 21585.0], [49.3, 21585.0], [49.4, 21585.0], [49.5, 21619.0], [49.6, 21619.0], [49.7, 21619.0], [49.8, 21619.0], [49.9, 21619.0], [50.0, 21708.0], [50.1, 21708.0], [50.2, 21708.0], [50.3, 21708.0], [50.4, 21708.0], [50.5, 22050.0], [50.6, 22050.0], [50.7, 22050.0], [50.8, 22050.0], [50.9, 22050.0], [51.0, 22166.0], [51.1, 22166.0], [51.2, 22166.0], [51.3, 22166.0], [51.4, 22166.0], [51.5, 22221.0], [51.6, 22221.0], [51.7, 22221.0], [51.8, 22221.0], [51.9, 22221.0], [52.0, 22239.0], [52.1, 22239.0], [52.2, 22239.0], [52.3, 22239.0], [52.4, 22239.0], [52.5, 22331.0], [52.6, 22331.0], [52.7, 22331.0], [52.8, 22331.0], [52.9, 22331.0], [53.0, 22335.0], [53.1, 22335.0], [53.2, 22335.0], [53.3, 22335.0], [53.4, 22335.0], [53.5, 22433.0], [53.6, 22433.0], [53.7, 22433.0], [53.8, 22433.0], [53.9, 22433.0], [54.0, 22547.0], [54.1, 22547.0], [54.2, 22547.0], [54.3, 22547.0], [54.4, 22547.0], [54.5, 22951.0], [54.6, 22951.0], [54.7, 22951.0], [54.8, 22951.0], [54.9, 22951.0], [55.0, 23062.0], [55.1, 23062.0], [55.2, 23062.0], [55.3, 23062.0], [55.4, 23062.0], [55.5, 23096.0], [55.6, 23096.0], [55.7, 23096.0], [55.8, 23096.0], [55.9, 23096.0], [56.0, 23212.0], [56.1, 23212.0], [56.2, 23212.0], [56.3, 23212.0], [56.4, 23212.0], [56.5, 23403.0], [56.6, 23403.0], [56.7, 23403.0], [56.8, 23403.0], [56.9, 23403.0], [57.0, 23487.0], [57.1, 23487.0], [57.2, 23487.0], [57.3, 23487.0], [57.4, 23487.0], [57.5, 23493.0], [57.6, 23493.0], [57.7, 23493.0], [57.8, 23493.0], [57.9, 23493.0], [58.0, 23565.0], [58.1, 23565.0], [58.2, 23565.0], [58.3, 23565.0], [58.4, 23565.0], [58.5, 23676.0], [58.6, 23676.0], [58.7, 23676.0], [58.8, 23676.0], [58.9, 23676.0], [59.0, 23792.0], [59.1, 23792.0], [59.2, 23792.0], [59.3, 23792.0], [59.4, 23792.0], [59.5, 23954.0], [59.6, 23954.0], [59.7, 23954.0], [59.8, 23954.0], [59.9, 23954.0], [60.0, 24037.0], [60.1, 24037.0], [60.2, 24037.0], [60.3, 24037.0], [60.4, 24037.0], [60.5, 24060.0], [60.6, 24060.0], [60.7, 24060.0], [60.8, 24060.0], [60.9, 24060.0], [61.0, 24108.0], [61.1, 24108.0], [61.2, 24108.0], [61.3, 24108.0], [61.4, 24108.0], [61.5, 24189.0], [61.6, 24189.0], [61.7, 24189.0], [61.8, 24189.0], [61.9, 24189.0], [62.0, 24308.0], [62.1, 24308.0], [62.2, 24308.0], [62.3, 24308.0], [62.4, 24308.0], [62.5, 24413.0], [62.6, 24413.0], [62.7, 24413.0], [62.8, 24413.0], [62.9, 24413.0], [63.0, 24470.0], [63.1, 24470.0], [63.2, 24470.0], [63.3, 24470.0], [63.4, 24470.0], [63.5, 24563.0], [63.6, 24563.0], [63.7, 24563.0], [63.8, 24563.0], [63.9, 24563.0], [64.0, 24671.0], [64.1, 24671.0], [64.2, 24671.0], [64.3, 24671.0], [64.4, 24671.0], [64.5, 24846.0], [64.6, 24846.0], [64.7, 24846.0], [64.8, 24846.0], [64.9, 24846.0], [65.0, 24922.0], [65.1, 24922.0], [65.2, 24922.0], [65.3, 24922.0], [65.4, 24922.0], [65.5, 24954.0], [65.6, 24954.0], [65.7, 24954.0], [65.8, 24954.0], [65.9, 24954.0], [66.0, 24958.0], [66.1, 24958.0], [66.2, 24958.0], [66.3, 24958.0], [66.4, 24958.0], [66.5, 25017.0], [66.6, 25017.0], [66.7, 25017.0], [66.8, 25017.0], [66.9, 25017.0], [67.0, 25097.0], [67.1, 25097.0], [67.2, 25097.0], [67.3, 25097.0], [67.4, 25097.0], [67.5, 25115.0], [67.6, 25115.0], [67.7, 25115.0], [67.8, 25115.0], [67.9, 25115.0], [68.0, 25200.0], [68.1, 25200.0], [68.2, 25200.0], [68.3, 25200.0], [68.4, 25200.0], [68.5, 25279.0], [68.6, 25279.0], [68.7, 25279.0], [68.8, 25279.0], [68.9, 25279.0], [69.0, 25336.0], [69.1, 25336.0], [69.2, 25336.0], [69.3, 25336.0], [69.4, 25336.0], [69.5, 25431.0], [69.6, 25431.0], [69.7, 25431.0], [69.8, 25431.0], [69.9, 25431.0], [70.0, 25470.0], [70.1, 25470.0], [70.2, 25470.0], [70.3, 25470.0], [70.4, 25470.0], [70.5, 25523.0], [70.6, 25523.0], [70.7, 25523.0], [70.8, 25523.0], [70.9, 25523.0], [71.0, 25569.0], [71.1, 25569.0], [71.2, 25569.0], [71.3, 25569.0], [71.4, 25569.0], [71.5, 25723.0], [71.6, 25723.0], [71.7, 25723.0], [71.8, 25723.0], [71.9, 25723.0], [72.0, 25770.0], [72.1, 25770.0], [72.2, 25770.0], [72.3, 25770.0], [72.4, 25770.0], [72.5, 25861.0], [72.6, 25861.0], [72.7, 25861.0], [72.8, 25861.0], [72.9, 25861.0], [73.0, 25909.0], [73.1, 25909.0], [73.2, 25909.0], [73.3, 25909.0], [73.4, 25909.0], [73.5, 25984.0], [73.6, 25984.0], [73.7, 25984.0], [73.8, 25984.0], [73.9, 25984.0], [74.0, 26033.0], [74.1, 26033.0], [74.2, 26033.0], [74.3, 26033.0], [74.4, 26033.0], [74.5, 26139.0], [74.6, 26139.0], [74.7, 26139.0], [74.8, 26139.0], [74.9, 26139.0], [75.0, 26279.0], [75.1, 26279.0], [75.2, 26279.0], [75.3, 26279.0], [75.4, 26279.0], [75.5, 26311.0], [75.6, 26311.0], [75.7, 26311.0], [75.8, 26311.0], [75.9, 26311.0], [76.0, 26345.0], [76.1, 26345.0], [76.2, 26345.0], [76.3, 26345.0], [76.4, 26345.0], [76.5, 26372.0], [76.6, 26372.0], [76.7, 26372.0], [76.8, 26372.0], [76.9, 26372.0], [77.0, 26375.0], [77.1, 26375.0], [77.2, 26375.0], [77.3, 26375.0], [77.4, 26375.0], [77.5, 26417.0], [77.6, 26417.0], [77.7, 26417.0], [77.8, 26417.0], [77.9, 26417.0], [78.0, 26501.0], [78.1, 26501.0], [78.2, 26501.0], [78.3, 26501.0], [78.4, 26501.0], [78.5, 26631.0], [78.6, 26631.0], [78.7, 26631.0], [78.8, 26631.0], [78.9, 26631.0], [79.0, 26755.0], [79.1, 26755.0], [79.2, 26755.0], [79.3, 26755.0], [79.4, 26755.0], [79.5, 26869.0], [79.6, 26869.0], [79.7, 26869.0], [79.8, 26869.0], [79.9, 26869.0], [80.0, 26994.0], [80.1, 26994.0], [80.2, 26994.0], [80.3, 26994.0], [80.4, 26994.0], [80.5, 27045.0], [80.6, 27045.0], [80.7, 27045.0], [80.8, 27045.0], [80.9, 27045.0], [81.0, 27086.0], [81.1, 27086.0], [81.2, 27086.0], [81.3, 27086.0], [81.4, 27086.0], [81.5, 27095.0], [81.6, 27095.0], [81.7, 27095.0], [81.8, 27095.0], [81.9, 27095.0], [82.0, 27133.0], [82.1, 27133.0], [82.2, 27133.0], [82.3, 27133.0], [82.4, 27133.0], [82.5, 27233.0], [82.6, 27233.0], [82.7, 27233.0], [82.8, 27233.0], [82.9, 27233.0], [83.0, 27283.0], [83.1, 27283.0], [83.2, 27283.0], [83.3, 27283.0], [83.4, 27283.0], [83.5, 27339.0], [83.6, 27339.0], [83.7, 27339.0], [83.8, 27339.0], [83.9, 27339.0], [84.0, 27393.0], [84.1, 27393.0], [84.2, 27393.0], [84.3, 27393.0], [84.4, 27393.0], [84.5, 27446.0], [84.6, 27446.0], [84.7, 27446.0], [84.8, 27446.0], [84.9, 27446.0], [85.0, 27518.0], [85.1, 27518.0], [85.2, 27518.0], [85.3, 27518.0], [85.4, 27518.0], [85.5, 27615.0], [85.6, 27615.0], [85.7, 27615.0], [85.8, 27615.0], [85.9, 27615.0], [86.0, 27681.0], [86.1, 27681.0], [86.2, 27681.0], [86.3, 27681.0], [86.4, 27681.0], [86.5, 27758.0], [86.6, 27758.0], [86.7, 27758.0], [86.8, 27758.0], [86.9, 27758.0], [87.0, 27840.0], [87.1, 27840.0], [87.2, 27840.0], [87.3, 27840.0], [87.4, 27840.0], [87.5, 27899.0], [87.6, 27899.0], [87.7, 27899.0], [87.8, 27899.0], [87.9, 27899.0], [88.0, 27993.0], [88.1, 27993.0], [88.2, 27993.0], [88.3, 27993.0], [88.4, 27993.0], [88.5, 28053.0], [88.6, 28053.0], [88.7, 28053.0], [88.8, 28053.0], [88.9, 28053.0], [89.0, 28150.0], [89.1, 28150.0], [89.2, 28150.0], [89.3, 28150.0], [89.4, 28150.0], [89.5, 28227.0], [89.6, 28227.0], [89.7, 28227.0], [89.8, 28227.0], [89.9, 28227.0], [90.0, 28266.0], [90.1, 28266.0], [90.2, 28266.0], [90.3, 28266.0], [90.4, 28266.0], [90.5, 28340.0], [90.6, 28340.0], [90.7, 28340.0], [90.8, 28340.0], [90.9, 28340.0], [91.0, 28423.0], [91.1, 28423.0], [91.2, 28423.0], [91.3, 28423.0], [91.4, 28423.0], [91.5, 28504.0], [91.6, 28504.0], [91.7, 28504.0], [91.8, 28504.0], [91.9, 28504.0], [92.0, 28552.0], [92.1, 28552.0], [92.2, 28552.0], [92.3, 28552.0], [92.4, 28552.0], [92.5, 28643.0], [92.6, 28643.0], [92.7, 28643.0], [92.8, 28643.0], [92.9, 28643.0], [93.0, 28711.0], [93.1, 28711.0], [93.2, 28711.0], [93.3, 28711.0], [93.4, 28711.0], [93.5, 28776.0], [93.6, 28776.0], [93.7, 28776.0], [93.8, 28776.0], [93.9, 28776.0], [94.0, 28842.0], [94.1, 28842.0], [94.2, 28842.0], [94.3, 28842.0], [94.4, 28842.0], [94.5, 28909.0], [94.6, 28909.0], [94.7, 28909.0], [94.8, 28909.0], [94.9, 28909.0], [95.0, 28960.0], [95.1, 28960.0], [95.2, 28960.0], [95.3, 28960.0], [95.4, 28960.0], [95.5, 28993.0], [95.6, 28993.0], [95.7, 28993.0], [95.8, 28993.0], [95.9, 28993.0], [96.0, 29019.0], [96.1, 29019.0], [96.2, 29019.0], [96.3, 29019.0], [96.4, 29019.0], [96.5, 29100.0], [96.6, 29100.0], [96.7, 29100.0], [96.8, 29100.0], [96.9, 29100.0], [97.0, 29139.0], [97.1, 29139.0], [97.2, 29139.0], [97.3, 29139.0], [97.4, 29139.0], [97.5, 29193.0], [97.6, 29193.0], [97.7, 29193.0], [97.8, 29193.0], [97.9, 29193.0], [98.0, 29234.0], [98.1, 29234.0], [98.2, 29234.0], [98.3, 29234.0], [98.4, 29234.0], [98.5, 29276.0], [98.6, 29276.0], [98.7, 29276.0], [98.8, 29276.0], [98.9, 29276.0], [99.0, 29312.0], [99.1, 29312.0], [99.2, 29312.0], [99.3, 29312.0], [99.4, 29312.0], [99.5, 29351.0], [99.6, 29351.0], [99.7, 29351.0], [99.8, 29351.0], [99.9, 29351.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 1100.0, "maxY": 4.0, "series": [{"data": [[1100.0, 2.0], [1300.0, 2.0], [1800.0, 1.0], [1900.0, 2.0], [2000.0, 2.0], [2200.0, 1.0], [2300.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [3100.0, 2.0], [3200.0, 1.0], [3300.0, 1.0], [3400.0, 2.0], [3500.0, 1.0], [3600.0, 1.0], [3800.0, 2.0], [3900.0, 3.0], [4000.0, 2.0], [4100.0, 1.0], [4200.0, 2.0], [4300.0, 1.0], [4400.0, 1.0], [4500.0, 1.0], [4600.0, 2.0], [4700.0, 2.0], [4800.0, 1.0], [4900.0, 1.0], [5000.0, 1.0], [5100.0, 2.0], [5200.0, 1.0], [5300.0, 1.0], [5400.0, 1.0], [5600.0, 2.0], [5700.0, 2.0], [5800.0, 1.0], [5900.0, 2.0], [6000.0, 1.0], [6100.0, 1.0], [6200.0, 1.0], [6300.0, 1.0], [8700.0, 1.0], [9700.0, 1.0], [10100.0, 1.0], [10700.0, 3.0], [10600.0, 1.0], [11300.0, 1.0], [11400.0, 1.0], [13000.0, 1.0], [13300.0, 1.0], [13400.0, 2.0], [13600.0, 1.0], [14300.0, 1.0], [16800.0, 1.0], [16700.0, 1.0], [16600.0, 1.0], [17900.0, 1.0], [17800.0, 1.0], [18000.0, 1.0], [18800.0, 1.0], [18700.0, 1.0], [19400.0, 1.0], [19300.0, 1.0], [19800.0, 2.0], [19700.0, 1.0], [19600.0, 2.0], [19900.0, 2.0], [20300.0, 1.0], [20200.0, 1.0], [20400.0, 1.0], [20800.0, 2.0], [21000.0, 1.0], [21100.0, 1.0], [21500.0, 2.0], [21700.0, 1.0], [21600.0, 1.0], [22000.0, 1.0], [22100.0, 1.0], [22200.0, 2.0], [22300.0, 2.0], [22400.0, 1.0], [22500.0, 1.0], [22900.0, 1.0], [23000.0, 2.0], [23200.0, 1.0], [23400.0, 3.0], [23500.0, 1.0], [23600.0, 1.0], [23700.0, 1.0], [23900.0, 1.0], [24000.0, 2.0], [24100.0, 2.0], [24300.0, 1.0], [24400.0, 2.0], [24500.0, 1.0], [24600.0, 1.0], [24900.0, 3.0], [24800.0, 1.0], [25000.0, 2.0], [25100.0, 1.0], [25200.0, 2.0], [25300.0, 1.0], [25400.0, 2.0], [25500.0, 2.0], [26400.0, 1.0], [25700.0, 2.0], [25800.0, 1.0], [25900.0, 2.0], [26000.0, 1.0], [26100.0, 1.0], [26300.0, 4.0], [26200.0, 1.0], [26500.0, 1.0], [26600.0, 1.0], [27400.0, 1.0], [26700.0, 1.0], [26800.0, 1.0], [26900.0, 1.0], [27000.0, 3.0], [27100.0, 1.0], [27200.0, 2.0], [27300.0, 2.0], [27500.0, 1.0], [27600.0, 2.0], [27800.0, 2.0], [27700.0, 1.0], [27900.0, 1.0], [28000.0, 1.0], [28100.0, 1.0], [28200.0, 2.0], [28300.0, 1.0], [28400.0, 1.0], [28500.0, 2.0], [28600.0, 1.0], [28700.0, 2.0], [28800.0, 1.0], [28900.0, 3.0], [29000.0, 1.0], [29100.0, 3.0], [29200.0, 2.0], [29300.0, 2.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 29300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 4.0, "minX": 1.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 196.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 4.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 196.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 47.0, "minX": 1.71785118E12, "maxY": 73.61682242990656, "series": [{"data": [[1.71785124E12, 47.0], [1.71785118E12, 73.61682242990656]], "isOverall": false, "label": "Sign Up", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71785124E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 8070.75, "minX": 1.0, "maxY": 29351.0, "series": [{"data": [[2.0, 29276.0], [3.0, 29351.0], [4.0, 29312.0], [5.0, 29234.0], [6.0, 29139.0], [7.0, 29100.0], [8.0, 29019.0], [9.0, 28993.0], [10.0, 28960.0], [11.0, 28909.0], [12.0, 28842.0], [13.0, 28776.0], [14.0, 15031.5], [15.0, 8070.75], [16.0, 28552.0], [17.0, 28504.0], [18.0, 28423.0], [19.0, 28340.0], [20.0, 15059.0], [21.0, 8538.25], [22.0, 15121.0], [23.0, 15138.0], [24.0, 27993.0], [25.0, 15143.0], [26.0, 27840.0], [27.0, 27758.0], [28.0, 27681.0], [29.0, 27615.0], [30.0, 27518.0], [31.0, 11154.0], [32.0, 9184.0], [33.0, 15297.5], [35.0, 11395.666666666668], [34.0, 27283.0], [36.0, 11362.333333333332], [37.0, 27086.0], [38.0, 15366.0], [39.0, 11593.666666666668], [40.0, 9704.5], [41.0, 11665.333333333332], [42.0, 15461.0], [43.0, 11702.0], [44.0, 15428.0], [45.0, 15405.5], [46.0, 15467.0], [47.0, 11886.333333333332], [48.0, 11932.666666666668], [49.0, 15564.0], [50.0, 15646.5], [51.0, 15573.5], [52.0, 12100.666666666668], [53.0, 15605.0], [54.0, 15625.0], [55.0, 15677.5], [57.0, 12336.333333333332], [56.0, 25770.0], [58.0, 12335.0], [59.0, 15672.0], [60.0, 12448.0], [61.0, 15721.0], [62.0, 15728.5], [63.0, 15753.0], [64.0, 15776.5], [67.0, 25017.0], [66.0, 25097.0], [65.0, 25115.0], [71.0, 24954.0], [70.0, 24846.0], [69.0, 24922.0], [68.0, 24958.0], [75.0, 24413.0], [74.0, 24470.0], [73.0, 24563.0], [72.0, 24671.0], [79.0, 24037.0], [78.0, 24108.0], [77.0, 24189.0], [76.0, 24308.0], [83.0, 23676.0], [82.0, 23792.0], [81.0, 23954.0], [80.0, 24060.0], [87.0, 23487.0], [86.0, 23403.0], [85.0, 23493.0], [84.0, 23565.0], [88.0, 15974.0], [91.0, 22951.0], [90.0, 23062.0], [89.0, 23096.0], [95.0, 22239.0], [94.0, 22331.0], [93.0, 22433.0], [92.0, 22547.0], [99.0, 15899.0], [98.0, 22166.0], [97.0, 22221.0], [96.0, 22335.0], [103.0, 15812.5], [102.0, 21585.0], [101.0, 21708.0], [100.0, 21619.0], [106.0, 15793.5], [107.0, 20827.0], [105.0, 21063.0], [104.0, 21167.0], [108.0, 13937.666666666666], [109.0, 15476.5], [111.0, 19984.0], [110.0, 20323.0], [112.0, 15631.5], [115.0, 15562.0], [114.0, 19600.0], [113.0, 19850.0], [119.0, 19408.0], [118.0, 19305.0], [117.0, 19844.0], [116.0, 19779.0], [123.0, 17878.0], [122.0, 18088.0], [121.0, 18888.0], [120.0, 18793.0], [127.0, 16856.0], [126.0, 16761.0], [125.0, 16673.0], [124.0, 17964.0], [131.0, 13180.0], [132.0, 13418.0], [130.0, 13483.0], [129.0, 13630.0], [128.0, 14375.0], [1.0, 29193.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[61.24000000000008, 17712.659999999996]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 132.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 506.46666666666664, "minX": 1.71785118E12, "maxY": 1193.5666666666666, "series": [{"data": [[1.71785124E12, 1037.6333333333334], [1.71785118E12, 1193.5666666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71785124E12, 506.46666666666664], [1.71785118E12, 582.4833333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71785124E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 10221.747663551401, "minX": 1.71785118E12, "maxY": 26331.236559139776, "series": [{"data": [[1.71785124E12, 26331.236559139776], [1.71785118E12, 10221.747663551401]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71785124E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 10221.644859813085, "minX": 1.71785118E12, "maxY": 26331.204301075268, "series": [{"data": [[1.71785124E12, 26331.204301075268], [1.71785118E12, 10221.644859813085]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71785124E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 2.193548387096774, "minX": 1.71785118E12, "maxY": 3.532710280373833, "series": [{"data": [[1.71785124E12, 2.193548387096774], [1.71785118E12, 3.532710280373833]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71785124E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1156.0, "minX": 1.71785118E12, "maxY": 29351.0, "series": [{"data": [[1.71785124E12, 29351.0], [1.71785118E12, 22335.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71785124E12, 28979.8], [1.71785118E12, 21233.600000000002]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71785124E12, 29351.0], [1.71785118E12, 22334.68]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71785124E12, 29205.3], [1.71785118E12, 22119.6]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.71785124E12, 22433.0], [1.71785118E12, 1156.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71785124E12, 26372.0], [1.71785118E12, 5966.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71785124E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 10590.0, "minX": 1.0, "maxY": 27114.0, "series": [{"data": [[4.0, 20393.5], [2.0, 10590.0], [8.0, 27114.0], [1.0, 13028.0], [5.0, 14218.5], [6.0, 24714.0], [3.0, 17964.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 8.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 10590.0, "minX": 1.0, "maxY": 27114.0, "series": [{"data": [[4.0, 20393.5], [2.0, 10590.0], [8.0, 27114.0], [1.0, 13028.0], [5.0, 14218.5], [6.0, 24714.0], [3.0, 17964.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 8.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 3.3333333333333335, "minX": 1.71785118E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.71785118E12, 3.3333333333333335]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71785118E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 1.55, "minX": 1.71785118E12, "maxY": 1.7833333333333334, "series": [{"data": [[1.71785124E12, 1.55], [1.71785118E12, 1.7833333333333334]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71785124E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 1.55, "minX": 1.71785118E12, "maxY": 1.7833333333333334, "series": [{"data": [[1.71785124E12, 1.55], [1.71785118E12, 1.7833333333333334]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71785124E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.55, "minX": 1.71785118E12, "maxY": 1.7833333333333334, "series": [{"data": [[1.71785124E12, 1.55], [1.71785118E12, 1.7833333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71785124E12, "title": "Total Transactions Per Second"}},
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

