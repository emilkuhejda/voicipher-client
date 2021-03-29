import { Injectable } from "@angular/core";

type scriptKey = 'script';

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {
    private scripts: any = {
        script: {
            loaded: false,
            src: 'assets/js/script.js'
        }
    };

    public constructor() { }

    public loadScript(name: scriptKey) {
        return new Promise((resolve, _) => {
            if (!this.scripts[name].loaded) {
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.scripts[name].src;
                script.id = "script-" + name;
                if (script.readyState) {
                    script.onreadystatechange = () => {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            this.scripts[name].loaded = true;
                            resolve({ script: name, loaded: true, status: 'Loaded' });
                        }
                    };
                } else {
                    script.onload = () => {
                        this.scripts[name].loaded = true;
                        resolve({ script: name, loaded: true, status: 'Loaded' });
                    };
                }
                script.onerror = (_: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
                document.getElementsByTagName('head')[0].appendChild(script);
            } else {
                resolve({ script: name, loaded: true, status: 'Already Loaded' });
            }
        });
    }

    public removeScript(name: scriptKey) {
        return new Promise((resolve, _) => {
            if (this.scripts[name].loaded) {
                this.scripts[name].loaded = false;
                let element = document.getElementById("script-" + name);
                if (element === null) {
                    resolve({ script: name, loaded: false, status: 'Script not found' });
                } else {
                    element.parentNode.removeChild(element);

                    resolve({ script: name, loaded: false, status: 'Loaded' });
                }
            }
        });
    }
}