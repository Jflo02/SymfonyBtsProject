<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\LitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=LitRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['lits_read']],
    attributes: ["pagination_enabled" => false]
)]
class Lit
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"lits_read"})
     */
    private $id;


    /**
     * @ORM\ManyToOne(targetEntity=Chambre::class, inversedBy="lit")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"lits_read"})
     */
    private $chambre;

    /**
     * @ORM\OneToMany(targetEntity=Sejour::class, mappedBy="lit")
     * @Groups({"lits_read"})
     */
    private $sejours;

    public function __construct()
    {
        $this->sejour = new ArrayCollection();
        $this->sejours = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }



    public function getChambre(): ?Chambre
    {
        return $this->chambre;
    }

    public function setChambre(?Chambre $chambre): self
    {
        $this->chambre = $chambre;

        return $this;
    }

    /**
     * @return Collection|Sejour[]
     */
    public function getSejours(): Collection
    {
        return $this->sejours;
    }

    public function addSejour(Sejour $sejour): self
    {
        if (!$this->sejours->contains($sejour)) {
            $this->sejours[] = $sejour;
            $sejour->setLit($this);
        }

        return $this;
    }

    public function removeSejour(Sejour $sejour): self
    {
        if ($this->sejours->removeElement($sejour)) {
            // set the owning side to null (unless already changed)
            if ($sejour->getLit() === $this) {
                $sejour->setLit(null);
            }
        }

        return $this;
    }
}
