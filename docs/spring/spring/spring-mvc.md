# Spring MVC

## 注解

### @RequestMapping

- @GetMapping
- @PostMapping
- @PutMapping
- @DeleteMapping

### @RequestParam

接收 String, Integer, Long. 参数

接收 List 参数

### @RequestBody

接收 Entity 参数

接收 List 参数

接收 Map 参数

### @RequestHeader

### @PathVariable



## RequestContextHolder


## ControllerAdvice

@RestControllerAdvice

注意，Controller 不能直接返回 String，否则会出现异常

全局异常处理


## WebMvcConfigure

### addResourceHandlers

### addCorsMappings 

### addInterceptors
