import { AMAP_API_BASE, AMAP_KEY } from "./const.js";

// 实况天气数据类型
export interface WeatherLive {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

// 预报天气类型
export interface WeatherForecast {
  date: string;
  week: string;
  dayweather: string;
  nightweather: string;
  daytemp: string;
  nighttemp: string;
  daywind: string;
  nightwind: string;
  daypower: string;
  nightpower: string;
}

// 天气预报返回结果类型
export interface WeatherForecastResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  forecast?: {
    city: string;
    adcode: string;
    province: string;
    reporttime: string;
    casts: WeatherForecast[];
  }[];
  lives?: WeatherLive[];
}

export async function getWeather(adcode: string, extensions: 'base' | 'all' = 'all'): Promise<WeatherForecastResponse> {
  const url = `${AMAP_API_BASE}/weather/weatherInfo?city=${adcode}&key=${AMAP_KEY}&extensions=${extensions}`;
  console.log('getWeather', url);
  const response = await fetch(url);
  const data: WeatherForecastResponse = await response.json();
  return data;
}
