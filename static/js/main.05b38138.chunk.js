(this["webpackJsonptoyshop-react"]=this["webpackJsonptoyshop-react"]||[]).push([[0],[,,,,,,,,,,,,,,,,,function(e,t,c){},,,,,,,,function(e,t,c){},function(e,t,c){},function(e,t,c){},,,,,,,function(e,t,c){},function(e,t,c){},,function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),i=c(18),r=c.n(i),a=(c(25),c(26),c(2)),o=c(3),l=c(6),j=(c(27),c(0)),d=Object(n.createContext)(null),u=function(e){var t=e.cartList,c=e.children,s=Object(n.useState)(t),i=Object(a.a)(s,2),r=i[0],o=i[1];return Object(j.jsx)(d.Provider,{value:{cart:r,setCart:o},children:c})},h=function(){return Object(n.useContext)(d)};function b(e,t){fetch(e).then((function(e){return e.json()})).then((function(e){return t(e)})).catch((function(e){return console.log(e)}))}var O=Object(n.createContext)(null),x=function(e){var t=e.status,c=e.children,s=Object(n.useState)(t),i=Object(a.a)(s,2),r=i[0],o=i[1],l=Object(n.useState)({}),d=Object(a.a)(l,2),u=d[0],h=d[1],b=Object(n.useState)("login"),x=Object(a.a)(b,2),m=x[0],p=x[1],f=Object(n.useState)(!1),v=Object(a.a)(f,2),g=v[0],N=v[1],y=Object(n.useState)(""),C=Object(a.a)(y,2),S=C[0],w=C[1];return Object(j.jsx)(O.Provider,{value:{authorized:r,setAuthorized:o,credential:u,actionName:m,setCredential:h,setActionName:p,loading:g,setLoading:N,authMsg:S,setAuthMsg:w},children:c})};function m(e,t,c,n,s,i,r){!function(e,t,c){fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t.credential.email,password:t.credential.password})}).then((function(e){return e.json()})).then((function(e){return c(e)})).catch((function(e){return console.log("error : ",e)}))}("https://reqres.in/api/"+t,e,(function(e){n(!1),"login"===t?e.token?(c(!0),s("Log in successful!")):s("Log in failed!"):e.id?s("Sign Up Successful. Please log in to continue."):s("Sign Up failed!")}))}var p=function(){var e,t=Object(n.useContext)(O),c=t.credential,s=t.actionName,i=t.setAuthorized,r=t.setLoading,a=t.setAuthMsg;t.authMsg,t.setCredential;return"object"===typeof(e=c)&&Object.keys(e).length&&Object.values(e).every((function(e){return null!=e&&""!==e}))?m(c,s,i,r,a):console.log("credential not valid"),Object(n.useContext)(O)};var f=function(){var e=Object(o.g)(),t=Object(n.useState)(!0),c=Object(a.a)(t,2),s=c[0],i=c[1],r=h(),d=r.cart,u=(r.setCart,p()),b=u.authorized,O=u.setAuthorized,x=u.setCredential;function m(t){return t===e.pathname}var f=function(){window.scrollY>50?i(!1):i(!0)};return Object(n.useEffect)((function(){return window.addEventListener("scroll",f),function(){window.removeEventListener("scroll",f)}}),[]),Object(j.jsxs)("nav",{className:s?"bg-transparent":"bg-regular",children:[Object(j.jsx)("div",{className:"logo",children:Object(j.jsxs)("i",{children:[Object(j.jsx)("span",{className:"highlighted",children:"toy"}),"Shop"]})}),Object(j.jsxs)("ul",{className:"nav-links",children:[Object(j.jsx)(l.b,{to:"/toyshop-react/",className:"link-name",children:Object(j.jsx)("li",{className:m("/")?"active":"in-active",children:"Home"})}),Object(j.jsx)(l.b,{to:"/toyshop-react/popular",className:"link-name",children:Object(j.jsx)("li",{className:m("/popular")?"active":"in-active",children:"Popular"})}),Object(j.jsx)(l.b,{to:"/toyshop-react/upcoming",className:"link-name",children:Object(j.jsx)("li",{className:m("/upcoming")?"active":"in-active",children:"Upcoming"})}),b?Object(j.jsxs)("div",{className:"link-group",children:[Object(j.jsx)(l.b,{to:"/toyshop-react/cart",className:"link-name",children:Object(j.jsxs)("li",{className:m("/cart")?"active":"in-active",children:["Cart",d&&d.length>0&&Object(j.jsx)("sup",{children:d.length})]})}),Object(j.jsx)(l.b,{to:"/toyshop-react/",className:"link-name",children:Object(j.jsx)("li",{className:"in-active",onClick:function(){return O(!1),void x({})},children:"Log Out"})})]}):Object(j.jsx)(l.b,{to:"/toyshop-react/auth",className:"link-name",children:Object(j.jsx)("li",{className:m("/auth")?"active":"in-active",children:"Log In"})})]})]})};c(34);var v=function(e){var t=Object(o.f)();return Object(j.jsx)("div",{className:"card-container",children:e.list.map((function(e){return Object(j.jsxs)("div",{className:"card",onClick:function(){return c=e.itemId,void t.push("".concat("/toyshop-react","/product/").concat(c));var c},children:[Object(j.jsxs)("div",{className:"card-header",children:[Object(j.jsxs)("div",{className:"rating-container",children:[Object(j.jsx)("div",{className:"star",children:"\xa0"}),Object(j.jsx)("div",{className:"rating",children:e.item.ratings.avgStars})]}),Object(j.jsx)("div",{className:"ribbon-container",children:e.store?e.store.isNew?Object(j.jsx)("div",{children:"\xa0"}):Object(j.jsx)("div",{className:"ribbon",children:Object(j.jsx)("span",{children:"New"})}):Object(j.jsx)("div",{children:"\xa0"})})]}),Object(j.jsx)("img",{src:e.item.images.icon,alt:"Avatar",className:"card-img"}),Object(j.jsxs)("div",{className:"card-content",children:[Object(j.jsx)("h3",{children:Object(j.jsx)("b",{children:e.item.name})}),e.store?Object(j.jsxs)("p",{children:["$ ",e.store.cost," (USD)"]}):Object(j.jsxs)("p",{children:["$ ",e.item.cost," (USD)"]})]})]},e.itemId)}))})};c(35);var g=function(){return Object(j.jsx)("div",{className:"loader-container flex-container",children:Object(j.jsx)("div",{className:"loader"})})},N="https://fortnite-api.theapinetwork.com",y=Object(n.createContext)(null),C=function(e){var t=e.productType,c=e.children,s=Object(n.useState)(null),i=Object(a.a)(s,2),r=i[0],o=i[1],l=Object(n.useState)(t),d=Object(a.a)(l,2),u=d[0],h=d[1],O=Object(n.useState)(!1),x=Object(a.a)(O,2),m=x[0],p=x[1],f=function(e){switch(e){case"all":return N+"/store/get";case"popular":return N+"/items/list";case"upcoming":return N+"/upcoming/get";default:return""}}(u);return Object(n.useEffect)((function(){p(!0),b(f,(function(e){o(e.data.slice(0,50)),p(!1)}))}),[f]),Object(j.jsx)(y.Provider,{value:{products:r,loading:m,setProductType:h},children:c})};var S=function(e){var t=Object(n.useContext)(y),c=t.products,s=t.setProductType,i=t.loading;return Object(n.useEffect)((function(){s(e)})),{products:c,setProductType:s,loading:i}};var w=function(){var e=S("all"),t=e.products,c=e.loading;return Object(j.jsx)("div",{children:c?Object(j.jsx)(g,{}):t?t.length?Object(j.jsx)(v,{list:t}):Object(j.jsx)("h2",{children:"No products to show"}):Object(j.jsx)("div",{children:"Products not found"})})};var k=function(){var e=S("popular"),t=e.products,c=e.loading;return Object(j.jsx)("div",{children:c?Object(j.jsx)(g,{}):t?t.length?Object(j.jsx)(v,{list:t}):Object(j.jsx)("h2",{children:"No products to show"}):Object(j.jsx)("div",{children:"Products not found"})})};var I=function(){var e=S("upcoming"),t=e.products,c=e.loading;return Object(j.jsx)("div",{children:c?Object(j.jsx)(g,{}):t?t.length?Object(j.jsx)(v,{list:t}):Object(j.jsx)("h2",{children:"No products to show"}):Object(j.jsx)("div",{children:"Products not found"})})},P=c(10),L=c.n(P),A=c(12);c(37),c(38);var E=function(e){var t,c=h(),s=c.cart,i=c.setCart,r=Object(n.useState)(1),o=Object(a.a)(r,2),l=o[0],d=o[1],u=l*(t=e.product.item.cost,Number(t)>0?Number(t):100);function b(){e.onClose()}function O(){return(O=Object(A.a)(L.a.mark((function e(t,c){return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:x(t=JSON.parse(JSON.stringify(t)),c)?t.splice(m(t,c),1,c):t.push(c),i(t);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e,t){return e.filter((function(e){return e.product.itemId===t.product.itemId})).length>0}function m(e,t){return e.findIndex((function(e){return e.product.itemId===t.product.itemId}))}function p(e,t,c){var n=c;return e.forEach((function(e){n=e.itemId===t.itemId?n+c:c})),n}function f(e,t,c){var n=c;return e.forEach((function(e){n=e.product.itemId===t.itemId?n+c:c})),n}function v(e){d("add"===e?l<10?l+1:10:l>1?l-1:1)}return Object(j.jsx)("div",{className:"modal",children:Object(j.jsxs)("div",{className:"modal-content-container",children:[Object(j.jsx)("div",{className:"flex-container",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{className:"product-title",children:e.product.item.name}),Object(j.jsx)("img",{src:e.product.item.images.icon,alt:"Avatar",className:"cart-product-img"}),Object(j.jsxs)("table",{className:"purchase-table",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Item"}),Object(j.jsx)("th",{children:"Price"}),Object(j.jsx)("th",{children:"\xa0"})]})}),Object(j.jsx)("tbody",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:l}),Object(j.jsx)("td",{children:u}),Object(j.jsxs)("td",{className:"purchase-table-btn-container",children:[Object(j.jsx)("button",{className:"purchase-table-btn",onClick:function(){return v("add")},children:"+"}),Object(j.jsx)("button",{className:"purchase-table-btn",onClick:function(){return v("remove")},children:"-"})]})]})})]})]})}),Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{className:"modal-action-button",onClick:function(){var t={product:e.product,quantity:p(s,e.product,l),totalPrice:f(s,e.product,u)};!function(e,t){O.apply(this,arguments)}(s,t),b()},children:"CONFIRM"}),Object(j.jsx)("button",{className:"modal-action-button",onClick:b,children:"CANCEL"})]})]})})};c(17);var M=function(e){return Object(j.jsx)("div",{className:"modal",children:Object(j.jsx)("div",{className:"modal-content-container",children:Object(j.jsx)("div",{className:"flex-container",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"Please Log In to continue."}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{className:"modal-close-button",onClick:e.onClose,children:"OK"})})]})})})})};var T=function(e){var t=Object(n.useState)({}),c=Object(a.a)(t,2),s=c[0],i=c[1],r=Object(n.useState)(!1),l=Object(a.a)(r,2),d=l[0],u=l[1],h=Object(n.useState)(!1),O=Object(a.a)(h,2),x=O[0],m=O[1],f=Object(n.useState)(!1),v=Object(a.a)(f,2),N=v[0],y=v[1],C=p(),S=C.authorized,w=(C.setAuthorized,Object(o.f)());Object(n.useEffect)((function(){k()}),[]);var k=function(){var t=Object(A.a)(L.a.mark((function t(){return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:u(!0),b("https://fortnite-api.theapinetwork.com/item/get?id=".concat(e.match.params.id),(function(e){i(e.data),u(!1)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)("div",{children:d?Object(j.jsx)(g,{}):s.item?Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"product-container flex-container",children:[Object(j.jsxs)("div",{className:"product-container-item",children:[Object(j.jsx)("h1",{className:"product-name",children:s.item.name}),Object(j.jsx)("img",{src:s.item.images.icon,alt:"Avatar",className:"product-img"}),Object(j.jsx)("h3",{children:Object(j.jsxs)("i",{children:['"',s.item.description,'..."']})})]}),Object(j.jsxs)("div",{className:"product-container-item",children:[Object(j.jsx)("div",{className:"flex-container",children:Object(j.jsxs)("table",{className:"product-info-table",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Rating"}),Object(j.jsx)("th",{children:"Point"}),Object(j.jsx)("th",{children:"Vote"})]})}),Object(j.jsx)("tbody",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:s.item.ratings.avgStars}),Object(j.jsx)("td",{children:s.item.ratings.totalPoints}),Object(j.jsx)("td",{children:s.item.ratings.numberVotes})]})})]})}),Object(j.jsxs)("div",{className:"tag-container flex-container",children:[Object(j.jsx)("div",{className:"tag",children:s.item.type}),Object(j.jsx)("div",{className:"tag",children:s.item.rarity}),s.itemSet.setName?Object(j.jsx)("div",{className:"tag",children:s.itemSet.setName}):Object(j.jsx)("div",{children:"\xa0"})]}),Object(j.jsx)("div",{className:"bottom-container flex-container",children:Object(j.jsxs)("div",{className:"bottom-wrapper flex-container",children:[Object(j.jsxs)("div",{className:"product-price",children:["$ ",s.item.cost," (USD)"]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{className:"action-button",onClick:function(){S?m(!0):y(!0)},children:"ADD TO CART"})})]})})]})]}),x&&Object(j.jsx)(E,{onClose:function(){m(!1)},product:s}),N&&Object(j.jsx)(M,{onClose:function(){y(!1),w.push("/auth")}})]}):Object(j.jsx)("div",{children:"No product to show"})})};c(39),c(40);var D=function(e){return Object(j.jsx)("div",{className:"modal",children:Object(j.jsxs)("div",{className:"modal-content-container",children:[Object(j.jsx)("div",{className:"flex-container",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{className:"title",children:"Thank you."}),Object(j.jsx)("h3",{children:"Your order was completed successfully."}),Object(j.jsx)("div",{className:"flex-container",children:Object(j.jsxs)("table",{className:"order-info-table",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Date"}),Object(j.jsx)("th",{children:"Delivery (Max)"})]})}),Object(j.jsx)("tbody",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:function(){var e=new Date;return["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()]+" "+e.getDate()+", "+e.getFullYear()}()}),Object(j.jsx)("td",{children:"7 days"})]})})]})})]})}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{className:"modal-close-button",onClick:e.onClose,children:"CLOSE"})})]})})};var U=function(){var e=Object(o.f)(),t=h(),c=t.cart,s=t.setCart,i=Object(n.useState)(!1),r=Object(a.a)(i,2),l=r[0],d=r[1];return Object(j.jsxs)("div",{className:"flex-container",children:[c.length?Object(j.jsx)("div",{className:"cart-table-container",children:Object(j.jsxs)("table",{className:"cart-table",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Product"}),Object(j.jsx)("th",{children:"Quantity"}),Object(j.jsx)("th",{children:"Price (USD)"}),Object(j.jsx)("th",{children:"\xa0"})]})}),Object(j.jsxs)("tbody",{children:[c.map((function(e){return Object(j.jsxs)("tr",{children:[Object(j.jsxs)("td",{children:[Object(j.jsx)("img",{src:e.product.item.images.icon,alt:"Avatar",className:"cart-item-img"}),Object(j.jsx)("h4",{children:e.product.item.name})]}),Object(j.jsx)("td",{children:e.quantity}),Object(j.jsx)("td",{children:e.totalPrice}),Object(j.jsx)("td",{children:Object(j.jsx)("button",{className:"cart-table-btn",onClick:function(){return function(e){var t=JSON.parse(JSON.stringify(c));t.splice(function(e,t){return e.findIndex((function(e){return e.product.itemId===t.itemId}))}(t,e),1),s(t)}(e.product)},children:"REMOVE"})})]},e.product.itemId)})),Object(j.jsxs)("tr",{className:"final-result-row",children:[Object(j.jsx)("td",{colSpan:"2",children:"Total"}),Object(j.jsx)("td",{children:c.reduce((function(e,t){return e+t.totalPrice}),0)}),Object(j.jsx)("td",{className:"btn-container",children:Object(j.jsx)("button",{className:"cart-table-btn checkout-btn",onClick:function(){d(!0)},children:"CHECKOUT"})})]})]})]})}):Object(j.jsx)("div",{children:Object(j.jsx)("h1",{children:"You don't have any products in your cart."})}),Object(j.jsx)("div",{children:l&&Object(j.jsx)(D,{onClose:function(){d(!1),s([]),e.push("".concat("/toyshop-react","/"))}})})]})};c(41);var J=function(e){var t=p(),c=t.authorized,s=t.setCredential,i=t.setAuthMsg,r=Object(o.f)();function a(){s({}),i(""),c&&r.push("".concat("/toyshop-react","/"))}return Object(n.useEffect)((function(){return window.addEventListener("click",a),function(){window.removeEventListener("click",a)}}),[]),Object(j.jsx)("div",{className:"modal",children:Object(j.jsx)("div",{className:"modal-content-container",children:Object(j.jsx)("div",{className:"flex-container",children:Object(j.jsx)("div",{children:Object(j.jsx)("h2",{children:e.msg})})})})})};var z=function(){var e=Object(n.createRef)(),t=Object(n.createRef)(),c=Object(n.useState)("Log In"),s=Object(a.a)(c,2),i=s[0],r=s[1],o=p(),l=o.setCredential,d=o.setActionName,u=o.loading,h=o.setLoading,b=o.authMsg;function O(e){r(e)}function x(){var c,n={email:e.value,password:t.value};"object"===typeof(c=n)&&Object.keys(c).length&&Object.values(c).every((function(e){return null!=e&&""!==e}))?(h(!0),l({credential:n}),d(function(e){return"Log In"===e?"login":"register"}(i))):console.log("not a valid credential")}return o.setAuthMsg,Object(j.jsx)("div",{children:u?Object(j.jsx)(g,{}):Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"auth-main-container flex-container",children:Object(j.jsxs)("div",{className:"auth-wrapper",children:[Object(j.jsx)("h2",{children:i}),Object(j.jsxs)("div",{className:"auth-form log-in",children:[Object(j.jsxs)("div",{className:"auth-form-item-container",children:[Object(j.jsx)("div",{className:"auth-form-label",children:"Email"}),Object(j.jsx)("input",{type:"email",name:"email",className:"auth-form-input",autoComplete:"off",ref:function(t){return e=t}})]}),Object(j.jsxs)("div",{className:"auth-form-item-container",children:[Object(j.jsx)("div",{className:"auth-form-label",children:"Password"}),Object(j.jsx)("input",{type:"password",name:"password",className:"auth-form-input",autoComplete:"off",ref:function(e){return t=e}})]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{className:"auth-form-action-btn",onClick:function(){return x()},children:"SUBMIT"})}),"Log In"===i?Object(j.jsxs)("div",{className:"auth-msg",children:["Don't have an account? Please",Object(j.jsx)("span",{className:"auth-highlighted-text",onClick:function(){return O("Sign Up")},children:"Sign Up"})]}):Object(j.jsxs)("div",{className:"auth-msg",children:["Already have an account? Please",Object(j.jsx)("span",{className:"auth-highlighted-text",onClick:function(){return O("Log In")},children:"Log In"})]})]})]})}),Object(j.jsx)("div",{children:""!==b&&Object(j.jsx)(J,{msg:b})})]})})};var F=function(){var e=S("upcoming"),t=e.products,c=e.loading;return Object(j.jsx)("div",{children:c?Object(j.jsx)(g,{}):t?t.length?Object(j.jsx)(v,{list:t}):Object(j.jsx)("h2",{children:"No products to show"}):Object(j.jsx)("div",{children:"Products not found"})})};var R=function(){return Object(j.jsx)(x,{status:!1,children:Object(j.jsx)(C,{productType:"all",children:Object(j.jsx)(u,{cartList:[],children:Object(j.jsx)(l.a,{children:Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(f,{}),Object(j.jsxs)(o.c,{children:[Object(j.jsx)(o.a,{path:"/toyshop-react/",exact:!0,component:w}),Object(j.jsx)(o.a,{path:"/toyshop-react/popular",component:k}),Object(j.jsx)(o.a,{path:"/toyshop-react/upcoming",component:I}),Object(j.jsx)(o.a,{path:"/toyshop-react/product/:id",component:T}),Object(j.jsx)(o.a,{path:"/toyshop-react/cart",component:U}),Object(j.jsx)(o.a,{path:"/toyshop-react/auth",component:z}),Object(j.jsx)(o.a,{path:"/toyshop-react/test",component:F})]})]})})})})})},Y=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,43)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,i=t.getLCP,r=t.getTTFB;c(e),n(e),s(e),i(e),r(e)}))};r.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(R,{})}),document.getElementById("root")),Y()}],[[42,1,2]]]);
//# sourceMappingURL=main.05b38138.chunk.js.map