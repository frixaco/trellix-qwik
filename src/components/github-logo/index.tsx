import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const GithubLogo = component$(() => {
  return (
    <Link
      href="https://github.com/frixaco/trellix-qwik"
      // TODO: fix cursor pointer
      class="absolute right-0 top-0 cursor-pointer p-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="64"
        width="64"
        class="rounded-full"
        aria-label="Github Logo"
        role="img"
        viewBox="-6.39108 -10.38875 55.38936 62.3325"
        style="background-color: #0F0E0F"
      >
        <g fill="#fff">
          <path
            d="M21.3035 0C9.5395 0 0 9.5373 0 21.3035c0 9.4122 6.1041 17.3976 14.5687 20.2146 1.0646.1972 1.4555-.4622 1.4555-1.0249 0-.5076-.0198-2.1861-.0289-3.9662-5.9266 1.2887-7.1772-2.5136-7.1772-2.5136-.9691-2.462-2.3654-3.1171-2.3654-3.1171-1.9329-1.3222.1457-1.295.1457-1.295 2.1392.1502 3.2656 2.1956 3.2656 2.1956 1.9001 3.2565 4.9837 2.315 6.1994 1.7706.1916-1.3765.7433-2.3167 1.3526-2.8487-4.7319-.5383-9.706-2.3653-9.706-10.5283 0-2.3255.8322-4.2259 2.195-5.7178-.2212-.537-.9504-2.7037.2067-5.638 0 0 1.789-.5723 5.8596 2.184 1.6994-.472 3.5218-.7088 5.3323-.7172 1.8104.008 3.6343.2451 5.3368.7172 4.0661-2.7563 5.8526-2.184 5.8526-2.184 1.1596 2.9343.4304 5.101.2092 5.638 1.366 1.4919 2.1921 3.3923 2.1921 5.7178 0 8.1827-4.9837 9.984-9.7275 10.5114.7642.6611 1.445 1.9576 1.445 3.9451 0 2.8505-.0243 5.1446-.0243 5.8462 0 .5673.3831 1.2316 1.463 1.0224 8.4603-2.8201 14.5566-10.8028 14.5566-20.212C42.6071 9.5372 33.0691 0 21.3036 0"
            fill-rule="evenodd"
          />
          <path d="M8.0689 30.587c-.047.1061-.2135.1379-.3651.0649-.155-.0695-.2413-.2138-.1913-.32.046-.1087.2124-.139.367-.0663.1545.0695.2426.2152.1894.3214m.863.9625c-.1016.0942-.3006.0504-.435-.0984-.1397-.1485-.1655-.3475-.0624-.4427.1048-.0942.2974-.0501.4367.0984.1397.1503.1669.3475.0607.4427m.8399 1.2268c-.1305.091-.3443.006-.4763-.1834-.1305-.1898-.1305-.417.003-.508.132-.091.3426-.009.4763.1788.1302.1926.1302.4198-.003.5126m1.1506 1.1855c-.1167.1287-.3654.0942-.5475-.0815-.1862-.1718-.238-.4156-.1213-.5444.1185-.129.3686-.0928.552.0815.185.1715.241.417.1168.5444m1.5876.6882c-.052.167-.291.2424-.5324.1715-.241-.073-.3986-.268-.35-.4367.0502-.1683.2908-.247.5338-.1711.2406.0727.3987.2667.3486.4364m1.7435.1275c.006.1757-.1986.3214-.4519.3245-.2547.006-.461-.1365-.4639-.3094 0-.1774.2004-.3213.4547-.326.2533-.005.4611.1366.4611.3109m1.6223-.276c.0303.171-.1457.3471-.3972.394-.2473.0455-.4763-.0607-.5077-.2303-.0307-.1757.1482-.3517.3955-.3972.2519-.0437.4773.0593.5094.2335" />
        </g>
      </svg>
    </Link>
  );
});
