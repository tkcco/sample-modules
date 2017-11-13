import '../scss/style.scss';

import { testFunc, MyClass } from'./boom';
// import { MyClass } from'./boom';
// import { testFunc } from'./boom';
import defaultExport from'./boom';

testFunc('test for webpack');
const inst = new MyClass();
const DefaultExport = new defaultExport();
