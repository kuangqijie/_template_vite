import { Howl } from 'howler';
import { getMp3Url } from './index';

console.log('sound.js')

// 背景音乐
const soundBgm = new Howl({
  src: getMp3Url('bgm.mp3'),
  loop: true,
  volume: 0.8,
})


export {
  soundBgm,
}