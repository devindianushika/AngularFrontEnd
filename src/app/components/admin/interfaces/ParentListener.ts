import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export abstract class ParentListener {
    constructor() {
        
    }

    abstract getParent(parentRegNo : string) : void;
} 