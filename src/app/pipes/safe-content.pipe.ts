import { Pipe, PipeTransform }     from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

@Pipe({
  name: 'safeContent'
})
export class SafeContentPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content: string, type: 'style' | 'html' | 'script' | 'url' | 'resource-url' = 'html'): SafeValue {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(content);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(content);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(content);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(content);
      case 'resource-url':
        return this.sanitizer.bypassSecurityTrustResourceUrl(content);
      default:
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
  }

}
