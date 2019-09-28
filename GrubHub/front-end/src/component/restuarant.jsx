import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, animateScroll as scroll } from "react-scroll";
import Menu from "./menu";
import Axios from "axios";

class Restuarant extends Component {
  state = {
    rest_id: ""
  };

  componentWillMount() {
    let rest_id = this.props.match.params.id;
    Axios.get("http://localhost:3001/owner/profile/" + rest_id).then(
      response => {
        console.log("In profile");
        console.log(response.data);
      }
    );
  }

  render() {
    const imageStyle = {
      width: "100%",
      height: "300px",
      backgroundColor: "grey"
    };
    return (
      <div class="container-fluid">
        <div className="row">
          <img
            className="col-sm-12 rest-img-top mt-3"
            style={imageStyle}
            alt="..."
          ></img>
        </div>
        <h3 className="col-sm-12 mt-3">Restuarant Name</h3>
        <div className="col-sm-12">
          <p>
            My offspring wanted "scuba gear" for his birthday. Thats all he
            wanted.
          </p>
        </div>
        <Navbar sticky="top" bg="light" variant="light">
          <Nav sticky="top">
            <Nav.Item>
              <Link
                eventkey="1"
                className="nav-link"
                activeClass="active"
                to="menu"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Menu
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                eventkey="2"
                className="nav-link"
                to="about"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                About
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                eventkey="3"
                activeClass="active"
                className="nav-link"
                to="review"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Review
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        <div id="menu">
          <h2>Menu</h2>
          <Menu />
          <div>
            My offspring wanted "scuba gear" for his birthday. Thats all he
            wanted. I am not letting him swim off by himself to be taken for a
            baby seal by a great white and I will be fucked if I am going in
            there with him to be taken for an old skinny seal by a great white.
            When I explained to him that scuba gear is only for the sea and he,
            being such a small human, would be taken for a baby seal by a great
            white, he stated that he would see them coming because of the mask
            and added 'speargun' and 'knife' to his birthday list. I promised to
            look after a friends cat for the week. My place has a glass atrium
            that goes through two levels, I have put the cat in there with
            enough food and water to last the week. I am looking forward to the
            end of the week. It is just sitting there glaring at me, it doesn't
            do anything else. I can tell it would like to kill me. If I knew I
            could get a perfect replacement cat, I would kill this one now and
            replace it Friday afternoon. As we sit here glaring at each other I
            have already worked out several ways to kill it. The simplest would
            be to drop heavy items on it from the upstairs bedroom though I have
            enough basic engineering knowledge to assume that I could build some
            form of 'spear like' projectile device from parts in the downstairs
            shed. If the atrium was waterproof, the most entertaining would be
            to flood it with water. It wouldn't have to be that deep, just
            deeper than the cat. My offspring wanted "scuba gear" for his
            birthday. Thats all he wanted. I am not letting him swim off by
            himself to be taken for a baby seal by a great white and I will be
            fucked if I am going in there with him to be taken for an old skinny
            seal by a great white. When I explained to him that scuba gear is
            only for the sea and he, being such a small human, would be taken
            for a baby seal by a great white, he stated that he would see them
            coming because of the mask and added 'speargun' and 'knife' to his
            birthday list. I promised to look after a friends cat for the week.
            My place has a glass atrium that goes through two levels, I have put
            the cat in there with enough food and water to last the week. I am
            looking forward to the end of the week. It is just sitting there
            glaring at me, it doesn't do anything else. I can tell it would like
            to kill me. If I knew I could get a perfect replacement cat, I would
            kill this one now and replace it Friday afternoon. As we sit here
            glaring at each other I have already worked out several ways to kill
            it. The simplest would be to drop heavy items on it from the
            upstairs bedroom though I have enough basic engineering knowledge to
            assume that I could build some form of 'spear like' projectile
            device from parts in the downstairs shed. If the atrium was
            waterproof, the most entertaining would be to flood it with water.
            It wouldn't have to be that deep, just deeper than the cat. My
            offspring wanted "scuba gear" for his birthday. Thats all he wanted.
            I am not letting him swim off by himself to be taken for a baby seal
            by a great white and I will be fucked if I am going in there with
            him to be taken for an old skinny seal by a great white. When I
            explained to him that scuba gear is only for the sea and he, being
            such a small human, would be taken for a baby seal by a great white,
            he stated that he would see them coming because of the mask and
            added 'speargun' and 'knife' to his birthday list. I promised to
            look after a friends cat for the week. My place has a glass atrium
            that goes through two levels, I have put the cat in there with
            enough food and water to last the week. I am looking forward to the
            end of the week. It is just sitting there glaring at me, it doesn't
            do anything else. I can tell it would like to kill me. If I knew I
            could get a perfect replacement cat, I would kill this one now and
            replace it Friday afternoon. As we sit here glaring at each other I
            have already worked out several ways to kill it. The simplest would
            be to drop heavy items on it from the upstairs bedroom though I have
            enough basic engineering knowledge to assume that I could build some
            form of 'spear like' projectile device from parts in the downstairs
            shed. If the atrium was waterproof, the most entertaining would be
            to flood it with water. It wouldn't have to be that deep, just
            deeper than the cat. My offspring wanted "scuba gear" for his
            birthday. Thats all he wanted. I am not letting him swim off by
            himself to be taken for a baby seal by a great white and I will be
            fucked if I am going in there with him to be taken for an old skinny
            seal by a great white. When I explained to him that scuba gear is
            only for the sea and he, being such a small human, would be taken
            for a baby seal by a great white, he stated that he would see them
            coming because of the mask and added 'speargun' and 'knife' to his
            birthday list. I promised to look after a friends cat for the week.
            My place has a glass atrium that goes through two levels, I have put
            the cat in there with enough food and water to last the week. I am
            looking forward to the end of the week. It is just sitting there
            glaring at me, it doesn't do anything else. I can tell it would like
            to kill me. If I knew I could get a perfect replacement cat, I would
            kill this one now and replace it Friday afternoon. As we sit here
            glaring at each other I have already worked out several ways to kill
            it. The simplest would be to drop heavy items on it from the
            upstairs bedroom though I have enough basic engineering knowledge to
            assume that I could build some form of 'spear like' projectile
            device from parts in the downstairs shed. If the atrium was
            waterproof, the most entertaining would be to flood it with water.
            It wouldn't have to be that deep, just deeper than the cat. My
            offspring wanted "scuba gear" for his birthday. Thats all he wanted.
            I am not letting him swim off by himself to be taken for a baby seal
            by a great white and I will be fucked if I am going in there with
            him to be taken for an old skinny seal by a great white. When I
            explained to him that scuba gear is only for the sea and he, being
            such a small human, would be taken for a baby seal by a great white,
            he stated that he would see them coming because of the mask and
            added 'speargun' and 'knife' to his birthday list. I promised to
            look after a friends cat for the week. My place has a glass atrium
            that goes through two levels, I have put the cat in there with
            enough food and water to last the week. I am looking forward to the
            end of the week. It is just sitting there glaring at me, it doesn't
            do anything else. I can tell it would like to kill me. If I knew I
            could get a perfect replacement cat, I would kill this one now and
            replace it Friday afternoon. As we sit here glaring at each other I
            have already worked out several ways to kill it. The simplest would
            be to drop heavy items on it from the upstairs bedroom though I have
            enough basic engineering knowledge to assume that I could build some
            form of 'spear like' projectile device from parts in the downstairs
            shed. If the atrium was waterproof, the most entertaining would be
            to flood it with water. It wouldn't have to be that deep, just
            deeper than the cat. My offspring wanted "scuba gear" for his
            birthday. Thats all he wanted. I am not letting him swim off by
            himself to be taken for a baby seal by a great white and I will be
            fucked if I am going in there with him to be taken for an old skinny
            seal by a great white. When I explained to him that scuba gear is
            only for the sea and he, being such a small human, would be taken
            for a baby seal by a great white, he stated that he would see them
            coming because of the mask and added 'speargun' and 'knife' to his
            birthday list. I promised to look after a friends cat for the week.
            My place has a glass atrium that goes through two levels, I have put
            the cat in there with enough food and water to last the week. I am
            looking forward to the end of the week. It is just sitting there
            glaring at me, it doesn't do anything else. I can tell it would like
            to kill me. If I knew I could get a perfect replacement cat, I would
            kill this one now and replace it Friday afternoon. As we sit here
            glaring at each other I have already worked out several ways to kill
            it. The simplest would be to drop heavy items on it from the
            upstairs bedroom though I have enough basic engineering knowledge to
            assume that I could build some form of 'spear like' projectile
            device from parts in the downstairs shed. If the atrium was
            waterproof, the most entertaining would be to flood it with water.
            It wouldn't have to be that deep, just deeper than the cat.
          </div>
        </div>
        <div id="about">
          <h2>about</h2>
          <div>
            My offspring wanted "scuba gear" for his birthday. Thats all he
            wanted. I am not letting him swim off by himself to be taken for a
            baby seal by a great white and I will be fucked if I am going in
            there with him to be taken for an old skinny seal by a great white.
            When I explained to him that scuba gear is only for the sea and he,
            being such a small human, would be taken for a baby seal by a great
            white, he stated that he would see them coming because of the mask
            and added 'speargun' and 'knife' to his birthday list. I promised to
            look after a friends cat for the week. My place has a glass atrium
            that goes through two levels, I have put the cat in there with
            enough food and water to last the week. I am looking forward to the
            end of the week. It is just sitting there glaring at me, it doesn't
            do anything else. I can tell it would like to kill me. If I knew I
            could get a perfect replacement cat, I would kill this one now and
            replace it Friday afternoon. As we sit here glaring at each other I
            have already worked out several ways to kill it. The simplest would
            be to drop heavy items on it from the upstairs bedroom though I have
            enough basic engineering knowledge to assume that I could build some
            form of 'spear like' projectile device from parts in the downstairs
            shed. If the atrium was waterproof, the most entertaining would be
            to flood it with water. It wouldn't have to be that deep, just
            deeper than the cat.
          </div>
        </div>
        <div id="review">
          <h2>review</h2>
          <div>
            My offspring wanted "scuba gear" for his birthday. Thats all he
            wanted. I am not letting him swim off by himself to be taken for a
            baby seal by a great white and I will be fucked if I am going in
            there with him to be taken for an old skinny seal by a great white.
            When I explained to him that scuba gear is only for the sea and he,
            being such a small human, would be taken for a baby seal by a great
            white, he stated that he would see them coming because of the mask
            and added 'speargun' and 'knife' to his birthday list. I promised to
            look after a friends cat for the week. My place has a glass atrium
            that goes through two levels, I have put the cat in there with
            enough food and water to last the week. I am looking forward to the
            end of the week. It is just sitting there glaring at me, it doesn't
            do anything else. I can tell it would like to kill me. If I knew I
            could get a perfect replacement cat, I would kill this one now and
            replace it Friday afternoon. As we sit here glaring at each other I
            have already worked out several ways to kill it. The simplest would
            be to drop heavy items on it from the upstairs bedroom though I have
            enough basic engineering knowledge to assume that I could build some
            form of 'spear like' projectile device from parts in the downstairs
            shed. If the atrium was waterproof, the most entertaining would be
            to flood it with water. It wouldn't have to be that deep, just
            deeper than the cat. My offspring wanted "scuba gear" for his
            birthday. Thats all he wanted. I am not letting him swim off by
            himself to be taken for a baby seal by a great white and I will be
            fucked if I am going in there with him to be taken for an old skinny
            seal by a great white. When I explained to him that scuba gear is
            only for the sea and he, being such a small human, would be taken
            for a baby seal by a great white, he stated that he would see them
            coming because of the mask and added 'speargun' and 'knife' to his
            birthday list. I promised to look after a friends cat for the week.
            My place has a glass atrium that goes through two levels, I have put
            the cat in there with enough food and water to last the week. I am
            looking forward to the end of the week. It is just sitting there
            glaring at me, it doesn't do anything else. I can tell it would like
            to kill me. If I knew I could get a perfect replacement cat, I would
            kill this one now and replace it Friday afternoon. As we sit here
            glaring at each other I have already worked out several ways to kill
            it. The simplest would be to drop heavy items on it from the
            upstairs bedroom though I have enough basic engineering knowledge to
            assume that I could build some form of 'spear like' projectile
            device from parts in the downstairs shed. If the atrium was
            waterproof, the most entertaining would be to flood it with water.
            It wouldn't have to be that deep, just deeper than the cat. My
            offspring wanted "scuba gear" for his birthday. Thats all he wanted.
            I am not letting him swim off by himself to be taken for a baby seal
            by a great white and I will be fucked if I am going in there with
            him to be taken for an old skinny seal by a great white. When I
            explained to him that scuba gear is only for the sea and he, being
            such a small human, would be taken for a baby seal by a great white,
            he stated that he would see them coming because of the mask and
            added 'speargun' and 'knife' to his birthday list. I promised to
            look after a friends cat for the week. My place has a glass atrium
            that goes through two levels, I have put the cat in there with
            enough food and water to last the week. I am looking forward to the
            end of the week. It is just sitting there glaring at me, it doesn't
            do anything else. I can tell it would like to kill me. If I knew I
            could get a perfect replacement cat, I would kill this one now and
            replace it Friday afternoon. As we sit here glaring at each other I
            have already worked out several ways to kill it. The simplest would
            be to drop heavy items on it from the upstairs bedroom though I have
            enough basic engineering knowledge to assume that I could build some
            form of 'spear like' projectile device from parts in the downstairs
            shed. If the atrium was waterproof, the most entertaining would be
            to flood it with water. It wouldn't have to be that deep, just
            deeper than the cat. My offspring wanted "scuba gear" for his
            birthday. Thats all he wanted. I am not letting him swim off by
            himself to be taken for a baby seal by a great white and I will be
            fucked if I am going in there with him to be taken for an old skinny
            seal by a great white. When I explained to him that scuba gear is
            only for the sea and he, being such a small human, would be taken
            for a baby seal by a great white, he stated that he would see them
            coming because of the mask and added 'speargun' and 'knife' to his
            birthday list. I promised to look after a friends cat for the week.
            My place has a glass atrium that goes through two levels, I have put
            the cat in there with enough food and water to last the week. I am
            looking forward to the end of the week. It is just sitting there
            glaring at me, it doesn't do anything else. I can tell it would like
            to kill me. If I knew I could get a perfect replacement cat, I would
            kill this one now and replace it Friday afternoon. As we sit here
            glaring at each other I have already worked out several ways to kill
            it. The simplest would be to drop heavy items on it from the
            upstairs bedroom though I have enough basic engineering knowledge to
            assume that I could build some form of 'spear like' projectile
            device from parts in the downstairs shed. If the atrium was
            waterproof, the most entertaining would be to flood it with water.
            It wouldn't have to be that deep, just deeper than the cat. My
            offspring wanted "scuba gear" for his birthday. Thats all he wanted.
            I am not letting him swim off by himself to be taken for a baby seal
            by a great white and I will be fucked if I am going in there with
            him to be taken for an old skinny seal by a great white. When I
            explained to him that scuba gear is only for the sea and he, being
            such a small human, would be taken for a baby seal by a great white,
            he stated that he would see them coming because of the mask and
            added 'speargun' and 'knife' to his birthday list. I promised to
            look after a friends cat for the week. My place has a glass atrium
            that goes through two levels, I have put the cat in there with
            enough food and water to last the week. I am looking forward to the
            end of the week. It is just sitting there glaring at me, it doesn't
            do anything else. I can tell it would like to kill me. If I knew I
            could get a perfect replacement cat, I would kill this one now and
            replace it Friday afternoon. As we sit here glaring at each other I
            have already worked out several ways to kill it. The simplest would
            be to drop heavy items on it from the upstairs bedroom though I have
            enough basic engineering knowledge to assume that I could build some
            form of 'spear like' projectile device from parts in the downstairs
            shed. If the atrium was waterproof, the most entertaining would be
            to flood it with water. It wouldn't have to be that deep, just
            deeper than the cat. My offspring wanted "scuba gear" for his
            birthday. Thats all he wanted. I am not letting him swim off by
            himself to be taken for a baby seal by a great white and I will be
            fucked if I am going in there with him to be taken for an old skinny
            seal by a great white. When I explained to him that scuba gear is
            only for the sea and he, being such a small human, would be taken
            for a baby seal by a great white, he stated that he would see them
            coming because of the mask and added 'speargun' and 'knife' to his
            birthday list. I promised to look after a friends cat for the week.
            My place has a glass atrium that goes through two levels, I have put
            the cat in there with enough food and water to last the week. I am
            looking forward to the end of the week. It is just sitting there
            glaring at me, it doesn't do anything else. I can tell it would like
            to kill me. If I knew I could get a perfect replacement cat, I would
            kill this one now and replace it Friday afternoon. As we sit here
            glaring at each other I have already worked out several ways to kill
            it. The simplest would be to drop heavy items on it from the
            upstairs bedroom though I have enough basic engineering knowledge to
            assume that I could build some form of 'spear like' projectile
            device from parts in the downstairs shed. If the atrium was
            waterproof, the most entertaining would be to flood it with water.
            It wouldn't have to be that deep, just deeper than the cat. My
            offspring wanted "scuba gear" for his birthday. Thats all he wanted.
            I am not letting him swim off by himself to be taken for a baby seal
            by a great white and I will be fucked if I am going in there with
            him to be taken for an old skinny seal by a great white. When I
            explained to him that scuba gear is only for the sea and he, being
            such a small human, would be taken for a baby seal by a great white,
            he stated that he would see them coming because of the mask and
            added 'speargun' and 'knife' to his birthday list. I promised to
            look after a friends cat for the week. My place has a glass atrium
            that goes through two levels, I have put the cat in there with
            enough food and water to last the week. I am looking forward to the
            end of the week. It is just sitting there glaring at me, it doesn't
            do anything else. I can tell it would like to kill me. If I knew I
            could get a perfect replacement cat, I would kill this one now and
            replace it Friday afternoon. As we sit here glaring at each other I
            have already worked out several ways to kill it. The simplest would
            be to drop heavy items on it from the upstairs bedroom though I have
            enough basic engineering knowledge to assume that I could build some
            form of 'spear like' projectile device from parts in the downstairs
            shed. If the atrium was waterproof, the most entertaining would be
            to flood it with water. It wouldn't have to be that deep, just
            deeper than the cat.
          </div>
        </div>
      </div>
    );
  }
}

export default Restuarant;
