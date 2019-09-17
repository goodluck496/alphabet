export class Word {
  name: string = '';
  image: string = 'http://www.proathlete.nl/wp-content/uploads/2014/11/no_image_placeholder.png';
  hasImage?: boolean = false;

  constructor(props?: Word | any) {
    if (!props) {
      return;
    }
    Object.keys(props)
      .forEach((k: keyof Word | string) => {
        if (k === 'image' && !!props[k]) {
          this.hasImage = true;
        }
        if (!props[k]) {
          return;
        } else {
          this[k] = props[k];
        }
      });
  }
}
