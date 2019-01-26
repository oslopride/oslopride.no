import React from "react";

import Link from "next/link";

const Header = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Forsiden</a>
        </Link>
      </li>
      <li>
        <Link href="/program">
          <a>Program</a>
        </Link>
      </li>
      <li>
        <Link href="/pride-art">
          <a>Pride Art</a>
        </Link>
      </li>
      <li>
        <Link href="/pride-park">
          <a>Pride Park</a>
        </Link>
      </li>
      <li>
        <Link href="/pride-house">
          <a>Pride House</a>
        </Link>
      </li>
      <li>
        <Link href="/pride-parade">
          <a>Pride Parade</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>Om Oss</a>
        </Link>
      </li>
      <li>
        <Link href="/contact">
          <a>Kontakt</a>
        </Link>
      </li>
      <li>
        <Link href="/partners">
          <a>Partnere</a>
        </Link>
      </li>
      <li>
        <Link href="/become-partner">
          <a>Bli Partner</a>
        </Link>
      </li>
      <li>
        <Link href="/pride-store">
          <a>Pridebutikken</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Header;
