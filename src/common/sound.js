import { Howl } from 'howler';
import { getAssetsUrl } from './index';

console.log('sound.js')

// 背景音乐
const soundBgm = new Howl({
  src: getAssetsUrl('mp3/bgm.mp3'),
  loop: true,
  volume: 0.8,
})


export {
  soundBgm,
}