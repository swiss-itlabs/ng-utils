# Angular Utils [![Build Status](https://travis-ci.org/swiss-itlabs/ng-utils.svg?branch=master)](https://travis-ci.org/swiss-itlabs/ng-utils) [![npm version](https://badge.fury.io/js/%40itlabs%2Fng-utils.svg)](https://badge.fury.io/js/%40itlabs%2Fng-utils)

Project information you can find [here](../../README.md)

## API Documentation

API Documentation will be auto generated in the future.

### NameOf

Helper to get property names of an typescript object.

**Example :**

```ts
export class ProductModel {
    public id: number;
    public name: string;
}

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements AfterViewInit {
    @ViewChild(DropdownComponent, {static: false}) 
    private dropdown: DropdownComponent;

    public ngAfterViewInit() {
        dropdown.textField = NameOf.property<ProductModel>('name');
        dropdown.valueField = NameOf.property<ProductModel>('id');
    }
}
```
