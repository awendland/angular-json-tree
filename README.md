# Angular JaSON Tree

This plugin was forked from angular-json-tree, which was created by awendland.  But, he didn't respond to my pull request to fix a minor issue where tree nodes that were objects always had an expansion arrow even if the objects were empty. No hard feelings here as I'm sure he's very busy.  We just thought the unnecessary drop down arrow just cluttered up our UI, so a fork, a couple changes, a quick publish to npm, and here we are.  And, my name just happens to be Jason. :D

**The rest of this documentation is copied from awendland's repo with minor changes to reflect the difference in naming**
 
This plugin was created to address a common development issue: how to easily visualize JSON/JS Object trees. From a development standpoint, when querying API endpoints and wishing to easily visualize the response object—or from a design standpoint, when looking for an easy way to display a complex object—this plugin provides an easy to use directive for displaying the Object tree response.

This is nice and easy because all you should have to do is include the directive in your app, and then pass a reference to the directive of which object on the scope you want it to display.

A live implementation of this directive can be found at the original authors page (without the drop down arrow changes included here) [http://blog.alexwendland.com/angular-json-tree/](http://blog.alexwendland.com/angular-json-tree/) and the source for the original project can be found on the [gh-pages branch](https://github.com/awendland/angular-json-tree/tree/gh-pages).  

Source code for this project, with it's small change can be found at [https://github.com/logicalsoftware/angular-JaSON-tree](https://github.com/logicalsoftware/angular-JaSON-tree/).


**Requirements:** AngularJS 1.2+

**File Size:** v1.0.2

  * **JS**: 8.3Kb raw, 2.3Kb minified, 982b gzipped
  * **JS + CSS**: 9.6Kb raw, 3.3Kb minified, 1.42Kb gzipped

## Usage:

1. Include `angular-jason-tree` as a dependency for your app
```javascript
angular.module('myApp', ['angular-jason-tree'])
```
2. Include the supplied CSS file (or create your own).
3. Setup the directive and reference an object on your scope

JavaScript:

```javascript
$scope.someobj = {
    greetings: ["hi", "hello", "welcome"],
    parent: {
        child: "name",
        age: 42
    }
};
```

HTML:

```html
<jason-tree object="someobj"></jason-tree>
```

### via bower:
```
$ bower install angular-jason-tree
```

## Why I created this:

I was searching for a way to easily display the JSON results from an API endpoint. The objects were dynamic and followed no uniform pattern. Thus I created this AngularJS directive. Given the above input (from Usage), it would produce an expandable object similar to:

![Example Output](readme/example_output.png)

This directive helps me with another problem while developing: visualizing JSON objects. Being able to break down JSON objects piece by piece has proven invaluably useful. To simplify that process, I threw together this website: [http://blog.alexwendland.com/angular-json-tree/](http://blog.alexwendland.com/angular-json-tree/).

## Directive Configuration:
These attributes are available for configuration on the directive:

### object [required]

The object property takes the name of an object on the $scope. This object will be displayed as an expandable tree.

```html
<jason-tree object="someobj"></jason-tree>
```

### start-expanded [optional, default=false]

This is an optional attribute that designates if the tree's root should display as expanded initially. This is useful when you are only showing one jason-tree, but would probably be set to false if json-trees were being created with an ng-repeat loop.

```html
<jason-tree object="someobj" start-expanded="true"></jason-tree>
```

### root-name [optional, default='Object']

This is an optional attribute that sets the title displayed at the root node. This is useful when you are showing sub-portions of an object or want the object root node to have a different string than 'Object'.

```html
<jason-tree object="someobj" root-name="'Name'"></jason-tree>
```

## Styling

The default CSS is separated into two parts: structure and looks. The looks section can be easily modified in order to change font, color and toggle buttons. The structure section can also be modified, but some more care will be needed because it provides the framework from which this directive provides functionality. The looks framework will be covered here while the structure framework will only be touched on.

The jason-tree is based on recursive nodes of two basic structures. The first structure is for nodes that have no subnodes themselves (a leaf), and the other is for nodes that have children (a branch). Here the simplified template structures for each, with appropriate, style-able, class names.

### Leaf Nodes

```html
<jason-node class="not-expandable">
    <span class="key">{{key}}</span>
    <span class="leaf-value">{{value}}</span>
</jason-node>
```
In the default CSS, all `.key` elements have the same style, a bold red color. There is some padding, and then the property's value follows. By default, no special styling is applied to `.leaf-value` elements.

### Branch Nodes

Branch nodes have two states: expanded or not-expanded. The not-expanded state is very similar to the leaf nodes and simply exchanges the `.leaf-value` class for `.branch-preview`.

```html
<jason-node class="not-expandable">
    <span class="key">{{key}}</span>
    <span class="branch-preview">{{value}}</span>
</jason-node>
```
In the default CSS, `.branch-preview` elements are italicized, concatenated, hidden overflow, and reduced in opacity.

The expanded state is different and contains further subnodes that are generated with ng-repeat:

```html
<jason-node class="expandable">
    <span class="key">{{key}}</span>
    <ul class="branch-value">
        <li ng-repeat>
            <jason-node>{{subnode values}}</jason-node>
        </li>
    </ul>
</jason-node>
```
The `.expandable` class adds several features to the normal `jason-node` element. Particularly, by the default looks CSS, a carrot-style toggle pseudo-element will be created. This `::before` element will rotate 90 deg downward when the element is expanded.

Additionally, `jason-node` elements receive a class corresponding to their object type. For example, the `.array` class or `.object` may be placed on a `json-node`. These classes can be used for special stylings.

## Further Explanation:

An example implementation of this project can be found at the [gh-pages branch](https://github.com/awendland/angular-json-tree/tree/gh-pages) of this repository.

## Changelog

#### v1.0.2
  * Forked from angular-json-tree
  * changed drop down arrow behavior to not be shown when objects do not have any data.

## Credits:

Thank you to [Alex Wendland](https://blog.alexwendland.com/) for creating angular-json-tree in the first place.

Thank you to [Mark Lagendijk](https://stackoverflow.com/users/665825/mark-lagendijk) from StackOverflow for providing a service than assists in recursive directives. That post can be found [here](http://stackoverflow.com/questions/14430655/recursion-in-angular-directives).

Also, thank you to [chieffancypants](https://github.com/chieffancypants/) for his [angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar) project from which I used the README.md as inspiration for this (poor) one.

## License:

Licensed under the Creative Commons Attribution 4.0 International (CC-BY-4.0)
