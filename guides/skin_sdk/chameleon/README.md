# The "Chameleon" Feature

One nice feature of CKEditor is its flexibility to easily match a website color
scheme by simply setting the <code>config.uiColor</code> configuration option.
While the Barbie site would set it to
<code style="background:#F59FC6">#F59FC6</code>, Ninja Turtles would prefer
<code style="background:#B1CC3D">#B1CC3D</code>.

The core editor API controls the input of the preferred color, but it is the
skin job to tell it how to change the color. That's because the skin itself
defined where and how to use colors.

For that purpose, the <code>CKEDITOR.skin.chameleon</code> function must be
defined in the <code>skin.js</code> file. Please check the
[Moono skin](#!/guide/skin_sdk_intro-section-2) files for full details.

Note that adopting this feature is totally optional. A skin developer may decide
to have a fixed color and not give the possibility to change it. Of course we
don’t recommend this, but if that is the case, it is enough to not defined the
chameleon function in the <code>skin.js</code> file.
