---
title: "Understanding when to use stream() vs forEach() in Java"
date: 2024-11-03T10:58:18-03:00
draft: false
tags:
  - "programming"
  - "development"
  - "java"
  - "tips"
---

In Java, choosing between Stream() and ForEach() depends on what you want to do with your data. While both are used to iterate over collections, each has its own strengths.

## stream()

Using stream() is powerful for complex data transformations, allowing operations like filtering, mapping, and reducing. It's ideal for:

* Transformations and filters: Use Stream() to apply operations like filtering, mapping, grouping, or reducing data.
* Chained processing: Apply multiple operations in a single chain.
* Parallel processing: For large datasets, use parallelStream() to leverage multi-core processors.
* Immutability: Streams avoid side effects, allowing new collections to be generated without changing the original.

#### Example:

```java 
List<String> names = Arrays.asList("Maria", "José", "João");
List<String> filteredNames = names.stream()
.filter(name -> name.startsWith("J"))
.map(String::toUpperCase)
.collect(Collectors.toList());
```

The results will be a new list only with the names started with *J* in uppercase.

## forEach()

Using forEach() is perfect for simple tasks, applying an action to each item without returning anything. Use for:

* Simple operations: Direct tasks without transformations or chaining.
* Side effects: Modify elements in an existing collection.
* Readability: Simple and direct code.

#### Example:

```java 
List<String> names = Arrays.asList("Maria", "José", "João");
names.forEach(name -> System.out.println(name));
```

This code snippet will only print all items on the list.

## Final Thoughts

* Use Stream() for complex transformations, parallel processing, or immutability.
* Use ForEach() for simple, direct operations.

These two options complement each other, enabling Java developers to work with collections efficiently.

