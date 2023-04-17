# Spring MVC


## @RequestMapping

- @GetMapping：一般用于 select 操作，不能携带 body 参数
- @PostMapping：一般用于 insert 操作
- @PutMapping：一般用于 update 操作
- @DeleteMapping：一般用于 delete 操作

## @RequestParam

接收 String, Integer, Long. 参数

接收 List 参数

```
http://localhost:8081/list?str=A&str=B&str=C
```

## @RequestBody

接收 Entity 参数

接收 List 参数

接收 Map 参数

## @RequestHeader

## @PathVariable



## RequestContextHolder


## @RestControllerAdvice

注意，Controller 不能直接返回 String，否则会出现异常

全局异常处理


## WebMvcConfigure

### addResourceHandlers

### addCorsMappings 

### addInterceptors
